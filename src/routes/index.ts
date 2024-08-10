import express from "express";
import Auth from "./auth";
import Records from "./records";
import Operations from "./operations";



const Router = express.Router();


Router.use("/v1/auth", Auth);
Router.use("/v1/records", Records);
Router.use("/v1/operations", Operations);

export default Router;
