import {readDataFromDB} from "../utils/readDataFromDB.js";

export const usersHandler = async (req, res) => {
    // TODO Нужно для теста, не забыть убрать!!!
    await new Promise(r => setTimeout(r, 1000));

    return res.send(await readDataFromDB('users.json'));
}