import {requestedProduct} from "./metrics.js";
import {readDataFromDB} from "../utils/db.js";

export const productsHandler = async (req, res) => {
    const data = await readDataFromDB('products.json')

    const { productId } = req.query;

    const product = data.find(order => order.id === productId);

    requestedProduct.inc({ productId });

    return res.send(product);
}