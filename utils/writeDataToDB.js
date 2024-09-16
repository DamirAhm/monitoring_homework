import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

export const writeDataFromDB = async (fileName, data) => {
    const filePath = join(process.cwd(), 'db', fileName);

    await writeFile(filePath, JSON.stringify(data),{ encoding: 'utf-8'});
};