import * as Mongoose from "mongoose";
import { IOperation } from "../common/interfaces/entities";

const OperationSchema = new Mongoose.Schema<IOperation>({
    type: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }
});

export const Operation = Mongoose.model("operation", OperationSchema);

