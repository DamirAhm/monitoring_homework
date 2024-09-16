import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

export const readDataFromDB = async (fileName) => {
    const filePath = join(process.cwd(), 'db', fileName);

    const data = await readFile(filePath, { encoding: 'utf-8', flag: 'r+'});
    return JSON.parse(data);
};