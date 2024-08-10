import { Request, Response, NextFunction, RequestHandler } from "express";

export interface CustomReqRes extends RequestHandler{
    (req: Request, res: Response, next: NextFunction): void;
}


