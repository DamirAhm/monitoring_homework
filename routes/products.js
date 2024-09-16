import {readDataFromDB} from "../utils/readDataFromDB.js";

export const productsHandler = async (req, res) => {
    const data = await readDataFromDB('products.json')

    const { productId } = req.query;

    const product = data.find(order => order.id === productId);

    return res.send(product);
}