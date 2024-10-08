import axios from 'axios';
import {faker} from '@faker-js/faker';

const baseURL = process.env.SERVER_HOST || 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL
})

const productIds = [
    '200a52bf-fcf8-463b-baac-abaea9f94401',
    '27ac8932-6be5-4b83-9a17-30a17604b658',
    '2662f202-199e-47b3-9b81-4c29ec3575ba',
    '87ef61d6-f491-43d8-90fa-755dff7a6b11',
    '90f31118-5b21-41ba-875f-91f5cd96bbd6',
    'ef1799c8-6c86-46f7-b3fe-b003d3814b50',
    '0784a8eb-e322-4dc6-a088-cc06dd236940',
    'aac7bf07-add0-4353-aac7-5dc403697ae1',
    '1d8ef461-22b7-40d2-ad27-0668478a7830',
    'efb96e99-41c0-4ef6-8e30-cb7e618543da',
]

const sendRequestForUsers = () => {
    return axiosInstance.get(    `/api/users`);
}

const sendRequestForProduct = () => {
    const orderId = productIds[Math.floor(Math.random() * productIds.length)];

    return axiosInstance.get(    `/api/products?productId=${orderId}`);
}

const orderIds = []
const sendRequestForOrder = async () => {
    const newOrder ={
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        price: faker.number.int(),
        category: faker.commerce.product(),
        created_at: new Date().toISOString(),
    }

    await axiosInstance.post(    `/api/orders`, newOrder);
    orderIds.push(newOrder.id);
}
const sendRequestToDeleteOrder = () => {
    if (orderIds.length > 0) {
        const id = faker.helpers.arrayElement(orderIds);

        orderIds.splice(orderIds.indexOf(id), 1);

        return axiosInstance.delete('/api/orders', {
            data: {
                id
            }
        })
    }
}

const sendRandomRequests = (requestFn, rps = 50) => {
    try {
        const amount = Math.floor(Math.random() * (rps + 0.5));

        for (let i = 0; i < amount; i++) {
            const delay = Math.floor(Math.random() * 1000);
            setTimeout(() => requestFn(), delay);
        }
    } catch (e) {}
}

function generateTraffic() {
    setInterval(() => {
        sendRandomRequests(sendRequestForUsers);
        sendRandomRequests(sendRequestForProduct);
        sendRandomRequests(sendRequestForOrder, 2);
        sendRandomRequests(sendRequestToDeleteOrder, 4);
    }, 1000);
}

generateTraffic();
