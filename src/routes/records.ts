import express from "express";
import { AuthMiddlewares } from "../middlewares";
import {
  getRecords,
  softDeleteRecord,
  createRecord
} from "../controllers/records";

const Records = express.Router()

Records.get("/:offset/:filter", AuthMiddlewares.checkToken, getRecords);

Records.put("/:id", AuthMiddlewares.checkToken, softDeleteRecord);

Records.post("/", AuthMiddlewares.checkToken, createRecord);

export default Records;
