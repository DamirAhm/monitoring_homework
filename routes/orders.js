import {logger} from "../utils/logger.js";
import {readDataFromDB, writeDataToDB} from "../utils/db.js";

export const createOrderHandler = async (req, res) => {
    const body = req.body;

    const orders = await readDataFromDB('orders.json');

    await writeDataToDB('orders.json', [...orders, body]);

    logger.info({...body}, 'new order created')
}

export const deleteOrderHandler = async (req) => {
    const body = req.body;

    const orders = await readDataFromDB('orders.json');

    await writeDataToDB('orders.json', orders.filter(({id}) => id !== body.id));
}