import mongoos, {Schema} from 'mongoose';

const userSchema = new Schema(
    {
        uid: { 
            type: String, 
            unique: true 
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        
        displayName: {
            type: String,
            required: [true, 'displayName is required'],
        },
        username: { type: String, unique: true, default: () => `user-${Math.random().toString(36).substr(2, 9)}` },
        photoURL: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);


export const User = mongoos.model('User', userSchema);