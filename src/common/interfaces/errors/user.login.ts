import  mongoose  from "mongoose";

export interface Ilogin {
    _id?: mongoose.Schema.Types.ObjectId;
    email: string;
    password: string;
}




