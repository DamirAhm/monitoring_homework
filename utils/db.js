import {readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

export const fsQueueMap = new Map();

export const writeDataToDB = async (fileName, data) => {
    const filePath = join(process.cwd(), 'db', fileName);

    const fsQueue = fsQueueMap.get(filePath) || Promise.resolve();
    fsQueueMap.set(filePath, fsQueue.then(async () => writeFile(filePath, JSON.stringify(data),{ encoding: 'utf-8'})));

    return fsQueue;
};
export const readDataFromDB = async (fileName) => {
    const filePath = join(process.cwd(), 'db', fileName);

    const fsQueue = fsQueueMap.get(filePath) || Promise.resolve();

    fsQueueMap.set(filePath, fsQueue.then(() => readFile(filePath, {encoding: 'utf-8', flag: 'r+'})));
    return JSON.parse(await fsQueueMap.get(filePath));
};