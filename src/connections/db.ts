/* eslint-disable no-param-reassign */
import mongoose from "mongoose";
import config from "../../config";

const { Number } = mongoose.Schema.Types;
const { db } = config;

mongoose.set("strictQuery", true);

const originalCast = Number.cast();
Number.cast((v: any) => {
  if (typeof v === "string") {
    v = v.replace(/,/g, "");
    v = +v;
  }
  return originalCast(v);
});

export const connect = async () => {
  try {
    console.log("[DATABASE] Trying to connect");
    await mongoose.connect(db.str);
    console.log("[DATABASE] Mongoose connection open to Database");
  } catch (error) {
    console.log(`[DATABASE] Mongoose connection error for master DB: ${error}`);
  }
};

