import { Request, Response, NextFunction } from "express";

export interface Error {
    statusCode: number;
    message: string;
}

export interface CustomErrorProps {
  error: Error;
  req?: Request;
  res: Response;
  next: NextFunction;
}


