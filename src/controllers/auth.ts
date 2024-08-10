import { Request, Response, NextFunction } from 'express';
import { generate } from '../utils/jwt';
import { UserService } from '../services/';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body;
        await UserService.getUserLogin({email, password})
        const token = generate({ email });
        res.status(200).json(token);
    }   
    catch (error) {
        next(error);
    }   
}

