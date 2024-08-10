import { UserModel } from "../models";
import { Ilogin } from "../common/interfaces/errors/user.login";
import { compare } from "bcrypt";
import APIError from "../errors";
import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";
import { IUser, IUserToken } from "../common/interfaces/entities";


export const getUserLogin = async ({ email, password }: Ilogin) => {
  const user = await UserModel.User.findOne({ email });
  if (user === null ) {
    throw new APIError({
      message: "The user doesn't exist",
      statusCode: 404,
    });
  }
  if (user.password === undefined) {
    throw new APIError({
      message: "The user doesn't have a password",
      statusCode: 404,
    });
  }
  const isMatch = compare(password, user.password);
  if (!isMatch) {
    throw new APIError({
      message: "Incorrect password",
      statusCode: 404,
    });
  }
  return user;
};

export const getUser = async ({ _id, email }: IUserToken) => {

    console.log(email);
  let query = {};
  if (_id) {
    query = { _id: _id };
  } else if (email) {
    query = { email };
  } else {
    throw new APIError({
      message: "No _id or email provided",
      statusCode: 400,
    });
  }

  const user = await UserModel.User.findOne(query);

  if (user === null) {
    throw new APIError({
      message: "The user doesn't exist",
      statusCode: 404,
    });
  }

  return user;
};

export const updateUser = async (_id: mongoose.Schema.Types.ObjectId , data: any) => {

  if (!isValidObjectId(_id)) {
    throw new APIError({
      message: "User Id now allowed",
      statusCode: 404,
    });
  }
  const user = await UserModel.User.find({ _id });
    if (!user || user.length === 0) {
        throw new APIError({
        message: "User not found",
        statusCode: 404,
        });
    }
    const userUpdated = await UserModel.User.findByIdAndUpdate(
        _id,
        data,
        { new: true }
    );
    return userUpdated;
}

