import express, { Request, Response } from 'express';
import { login } from '../controllers/auth';

const Auth = express.Router();

Auth.post(
    '/login',
    login
  );

export default Auth;  