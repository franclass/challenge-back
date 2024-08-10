
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URL = process.env.MONGO_URL || "";

interface Config {
    db: {
        str: string;
    };
}


const config : Config = {
  db: {
    str: MONGO_URL,
  }
};

export default config;