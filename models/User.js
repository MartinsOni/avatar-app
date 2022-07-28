import mongoose from "mongoose";
import generateRobohashAvatar from "../helpers/avatar.js"

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: { type: String },
    ip: { type: String },
    hash: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: generateRobohashAvatar,
    },
    dates: {
        registered:
        {
            type: Date,
            default: Date.now(),
            last_active: Date
        }
    },
    messages: { type: Number, default: 0 }

});

const User = mongoose.model("User", UserSchema);

export default User;
