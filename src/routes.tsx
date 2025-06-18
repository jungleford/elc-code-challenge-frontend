import { createBrowserRouter, Navigate } from 'react-router-dom';

import globals from './config/globals';
import App from './App';
import { Products, Cart, Orders, Order } from './views';

async function fetchData(url: string) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {
        if (result.code === 200) {
            const data = result.data;
            console.log('[=== ELC data ===]', data);
            return data;
        } else {
            throw new Error(result.message);
        }
    })
    .catch(err => {
        console.error(err);
    });
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/products" replace />, // Redirect to products page by default
            },
            {
                path: '/products',
                element: <Products />,
                loader: async () => fetchData(`${globals.API_PREFIX}/products`),
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/orders',
                element: <Orders />,
                loader: async () => fetchData(`${globals.API_PREFIX}/orders`),
            },
            {
                path: '/order/:id',
                element: <Order />,
                loader: async ({ params }) => fetchData(`${globals.API_PREFIX}/orders/${params.id}`),
            },
        ],
    },
]);

export default router;
