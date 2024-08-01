import mongoose from "mongoose";

import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";
import {firebaseAdmin} from '../utils/firebase.js';


export const verifyUser = asyncHandler(async (req, res, next) => {
    try {
        if (!req.header('Authorization') || !req.header('Authorization').split(" ")[1]) {
            return res.status(401).json({ error: 'Unauthorized: No ID token provided' });
        }
        // console.log("Authorization", req.header('Authorization'));

        const idToken = req.header("Authorization")?.replace("Bearer ", "");
        let checkRevoked = true;

        // Debugging: Print token value
        // console.log("Token:", token);

        if (!idToken || typeof idToken !== "string") {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken, checkRevoked);
        const { uid } = decodedToken;
        const user = await User.findOne({ uid: uid });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});