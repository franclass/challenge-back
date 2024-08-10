import * as Mongoose from 'mongoose';
export interface IRecord {
    operation_id?: Mongoose.Schema.Types.ObjectId;
    user_id?: Mongoose.Schema.Types.ObjectId;
    amount_a?: string;
    amount_b?: Date;
    user_balance?: Number;
    operation_response?: string;
    deleted?: boolean;
    date?: Date;
}

export interface IOperation {
    type: string;
    cost: number;
}

export interface IUser {
    _id?: Mongoose.Schema.Types.ObjectId;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
    current_balance: number;
}

export interface IUserToken {
    _id?: Mongoose.Schema.Types.ObjectId;
    email?: string;
}


