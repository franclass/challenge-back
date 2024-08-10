import { UserModel } from "../models";
import { Ilogin } from "../common/interfaces/errors/user.login";
import { genSalt, hash } from "bcrypt";
import { DB } from "../../src/connections";

const createUser = async ({ email, password }: Ilogin) => {
  await DB.connect();

  const hashedPassword = new Promise((resolve, reject) => {
    genSalt(5, async (err, salt) => {
      try {
        console.log("[BCRTYPT] - Generating salt...");
        hash(password, salt, async (err, hash) => {
          resolve(hash);
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
  console.log("[BCRYPT] - Password hashed successfully!", await hashedPassword);
  await UserModel.User.create({ email: email, password: await hashedPassword });
};

createUser({ email: "admin@north.com", password: "North!1331" });
