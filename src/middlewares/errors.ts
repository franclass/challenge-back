import { Request, Response, NextFunction } from "express";
import APIError from "../errors";

interface IError {
  next: NextFunction;
  statusCode: number;
  data: any;
  message: string;
  responseCode?: number;
  response?: string;
}

export const custom = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    error.message === "jwt must be provided" ||
    error.message === "jwt malformed" ||
    error.message === "invalid signature" ||
    error.message === "jwt expired" ||
    error.message === "Unexpected token \b in JSON at position 27" ||
    error.message === "invalid token"
  ) {
    return res
      .status(401)
      .send({ status: "error", message: "Authorization token is missing" });
  }

  if (error instanceof APIError) {
    const { statusCode, message } = error;
    res
      .status(statusCode)
      .json({ status: "error", message: `${message}`, errors: error.data });
    return;
  }
  console.log(error);
  if (error.responseCode === 535) {
    const { responseCode, response } = error;
    res
      .status(responseCode)
      .json({ status: "error", message: `${response}`, errors: error.data });
    return;
  }

  return res
    .status(res.statusCode || 500)
    .send({ status: "error", message: error.message });
};
