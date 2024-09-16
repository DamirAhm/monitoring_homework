import {writeDataFromDB} from "../utils/writeDataToDB.js";
import {readDataFromDB} from "../utils/readDataFromDB.js";

export const ordersHandler = async (req, res) => {
    const body = req.body;

    const orders = await readDataFromDB('orders.json');

    await writeDataFromDB('orders.json', [...orders, body]);
}