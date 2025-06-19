import { useLoaderData } from 'react-router-dom';

import type { Order } from '../../models';

import './style.scss';

export function Order() {
    const order: Order = useLoaderData();

    return (
        <div className="panel-view">
            {order && order.product ? (
                <>
                    <img className="product-image" src={order.product.image} alt={order.product.name} />
                    <div className="product">
                        <div className="order-id">Order #{ order.id }</div>
                        <div className="product-name">{ order.product.name }</div>
                        <p className="product-price">${ order.product.price.toFixed(2) }</p>
                        <p className="product-quantity">Quantity: { order.quantity }</p>
                        <p className="product-price" style={{color: 'lightgreen'}}>Total: ${ (order.product.price * order.quantity).toFixed(2) }</p>
                    </div>
                </>
            ) : (
                <div className="order-empty">Order is empty.</div>
            )}
        </div>
    );
}
