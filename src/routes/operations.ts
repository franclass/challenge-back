import express from "express";
import { AuthMiddlewares } from "../middlewares";
import {
  getOperations,
} from "../controllers/operations";

const Staff = express.Router();

Staff.get("/:id?", getOperations);

export default Staff;
