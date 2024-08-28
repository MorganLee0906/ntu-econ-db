import fs from 'fs';
import path from 'path';

export function getFoldersData(cid, folderid) {
    const dataPath = path.join(process.cwd(), 'folders', `${cid}.json`);
    const data = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData[folderid];
}
export function getAllFolders() {
    const folderPath = path.join(process.cwd(), 'folders');
    const folders = fs.readdirSync(folderPath);
    return folders.flatMap((folder) => {
        const jsondata = fs.readFileSync(path.join(folderPath, `${folder}`), 'utf8');
        const curri = folder.replace(/\.json$/, '');
        return Object.keys(JSON.parse(jsondata)).map((key) => {
            return {
                params: {
                    cid: curri,
                    fid: key,
                },
            };
        });
    });
}