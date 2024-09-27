import {readDataFromDB} from "../utils/db.js";

export const productsHandler = async (req, res) => {
    const data = await readDataFromDB('products.json')

    const { productId } = req.query;

    const product = data.find(order => order.id === productId);

    return res.send(product);
}