import multer from "multer";
import { UploadDirectory } from "../common/interfaces/files";
import _ from "lodash";
import fs from "fs";

export const uploadFileStorage: UploadDirectory = (folder) => {

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const id = req.params.id;
        const path = `public_html/uploads/${folder}/${id}/`;
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, { recursive: true });
        }
        cb(null, path);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage });
    return upload;
 
};
