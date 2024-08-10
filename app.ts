import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import { MorganMiddleware, ErrorMiddlewares } from "./src/middlewares";
import { DB } from "./src/connections";
import Router from "./src/routes";
import APIError from "./src/errors";
import path from "path";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(MorganMiddleware);
app.use(express.static(path.join(__dirname, 'public_html')));
app.get("/", (req, res, next) => {
  res.send("Server is running");
  next();
});
app.use("/api", Router);


app.listen(port, async () => {
  await DB.connect();
  console.log(`[SERVER] server started on port ${port}`);
});

app.use(() => {
    throw new APIError({
      message: "the requested resource does not exist",
      statusCode: 404,
    });
  });

app.use(ErrorMiddlewares.custom);


