import fs from 'fs-extra';
import path from 'path';

interface Folder {
    folder: string;
    id: string;
}


export const deleteFolder = async ({folder,id}:Folder) => {
    const folderPath = path.join(__dirname, `../../public_html/uploads/${folder}`, id);
    await fs.remove(folderPath).then(() => console.log('Folder deleted successfully!'))
    .catch((err: Error) => console.error(err));
}
