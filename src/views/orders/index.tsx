import { Link, useLoaderData } from 'react-router-dom';

import type { Order } from '../../models';

import './style.scss';

export function Orders() {
    const orders: Order[] = useLoaderData();

    return (
        <div className="table-view">
        {orders?.length > 0 ? (
        <>
            <div className="table-head">
                <div className="table-row">
                    <div className="table-cell">#</div>
                    <div className="table-cell">Product</div>
                    <div className="table-cell">Quantity</div>
                </div>
            </div>

            <div className="table-body">
                {orders.map((order, index) => (
                <div className={index % 2 === 0 ? 'table-row odd-row' : 'table-row even-row'} key={order.id}>
                    <div className="table-cell"><Link to={`/order/${order.id}`}>{ order.id }</Link></div>
                    <div className="table-cell">{ order.product?.name }</div>
                    <div className="table-cell">{ order.quantity }</div>
                </div>
                ))}
            </div>
        </>
        ) : (
            <div className="in-middle">No record.</div>
        )}
        </div>
    );
}
