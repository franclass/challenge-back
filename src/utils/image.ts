import { imageUrl } from '../../enviroment.d';
import os from 'os';
import process  from 'process';
import dns from 'dns';


const { NODE_ENV, PORT, MONGO_URL, JWT_SECRET } = process.env;
export const getUrl = ({id, image, folder}:imageUrl) => {
    const hostname = os.hostname();
    const port = process.env.PORT || 3000;
    const currentUrl = `http://${hostname}:${port}`
    if (!image) return undefined;
    return `${currentUrl}/uploads/${folder}/${id}/${image}`;
}