import jwt from "jsonwebtoken";
import APIError from "../errors";
import { Request, Response, NextFunction } from "express";
import { extractFromHeaders } from "../utils/jwt";
import { getUser } from "../services/users";

const { JWT_SECRET } = process.env;

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractFromHeaders(req);
    const tokenParsed: any = jwt.verify(
      token?.split('"').join("") as string,
      JWT_SECRET as string
    );

    const email: string = tokenParsed?.email;

    if (!email) {
      throw new APIError({
        message: "Invalid token",
        statusCode: 401,
      });
    }

    console.log(email);

    req.body.email = email;
    const user = await getUser({ email });
    req.body.user_id = user._id;

    next();
  } catch (error) {
    next(error);
  }
};
