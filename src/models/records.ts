import * as Mongoose from "mongoose";
import { IRecord } from "../common/interfaces/entities";


const RecordSchema = new Mongoose.Schema<IRecord>({
    operation_id: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "operation",  
    },
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",    
    },
    amount_a: {
        type: String,
        required: true,
    },
    amount_b: {
        type: String,
        required: true,
    },
    user_balance: {
        type: String,
        required: true,
    },
    operation_response: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const Record = Mongoose.model("record", RecordSchema);

