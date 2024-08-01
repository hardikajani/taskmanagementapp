import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'

import { firebaseAdmin } from '../utils/firebase.js';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import auth from '../utils/firebase.js';




const registerUser = asyncHandler(async (req, res) => {
    const { displayName, email, password } = req.body;
    if ([email, displayName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }
    // Generate a default username if not provided
    const username = req.body.username || `user-${Math.random().toString(36).substr(2, 9)}`;

    // Create user in Firebase Authentication
    try {
        const userRecord = await firebaseAdmin.auth().createUser({
            email: email,
            emailVerified: false,
            password: password,
            displayName: displayName,
            disabled: false,
            emailVerified: false
        });
        // console.log('Successfully created new user:', userRecord);

        // Create user in MongoDB
        const user = new User({
            uid: userRecord?.uid,
            email: userRecord?.email,
            displayName: userRecord?.displayName,
            username: username,
            photoURL: userRecord?.photoURL || ''
        });
        await user.save();

        const createdUser = await User.findOne({ uid: user.uid });

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(
            new ApiResponse(200, "User registered successfully")
        );
    } catch (error) {
        console.error(error);
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const loginUser = await signInWithEmailAndPassword(auth, email, password);
        // console.log(loginUser);
        
        // Verify the user in MongoDB
        const user = await User.findOne({ uid: loginUser.user.uid });
        if (!user) {
            throw new ApiError(401, "User not found");
        }

        // Return the user data and token
        return res.status(200).json(
            new ApiResponse(
                200, 
                loginUser,
                "User logged in successfully"
            )
        );
    } catch (error) {
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
            throw new ApiError(401, "Invalid email or password");
        }
        console.error(error);
    }
});

const logout = asyncHandler(async (req, res) => {
    try {
        const uid = req.user?.uid
        if (!uid) throw new ApiError(401, "User not found");
      await signOut(auth);  
      // Return a success response
      return res.status(200).json(
        new ApiResponse(200, "User logged out successfully")
      );
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Failed to log out user");
    }
  });

export {
    registerUser,
    login,
    logout
}