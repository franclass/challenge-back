import jwt from "jsonwebtoken";
import {Request } from "express";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generate = (payload:any) => {
  const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: "365d" });
  return token.toString();
}

export const extractFromHeaders = (req:Request) => {
  const { authorization } = req.headers;
  if (!authorization) return null;
  const token = authorization.split(" ")[1];
  return token;
}
