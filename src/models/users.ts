import * as Mongoose from "mongoose";
import { IUser } from "../common/interfaces/entities";


const UserSchema = new Mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "active",
    },
    current_balance: {
        type: Number,
        default: 500,
    }
});


export const User = Mongoose.model("users", UserSchema);

