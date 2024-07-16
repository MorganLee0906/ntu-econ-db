import fs from 'fs';
import path from 'path';

export async function getFoldersData(cid, folderid) {
    const dataPath = path.join(process.cwd(), 'folders', `${cid}.json`);
    console.log(dataPath);
    const data = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(data);
    console.log(jsonData[folderid]);
    return jsonData[folderid];
}