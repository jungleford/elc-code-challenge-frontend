import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import globals from '../../config/globals';
import type { Product } from '../../models';
import { Counter } from '../../components';

import './style.scss';

export function Cart() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [productId, setProductId] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);

    // If cart exists, productId and quantity should be available at the same time.
    // Otherwise, resume them from local storage.
    useEffect(() => {
        let _productId = Number.parseInt(searchParams.get('productId') || '', 10);
        let _quantity = Number.parseInt(searchParams.get('quantity') || '', 10);
        if (Number.isInteger(_productId) && Number.isInteger(_quantity) && _productId > 0 && _quantity > 0) {
            setProductId(_productId);
            setQuantity(_quantity);
            localStorage.setItem('productId', `${_productId}`);
            localStorage.setItem('quantity', `${_quantity}`);

            fetch(`${globals.API_PREFIX}/products/${_productId}`, {
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
                    setProduct(data);
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(err => {
                console.error(err);
            });
        } else {
            const idInCache = localStorage.getItem('productId');
            const quantityInCache = localStorage.getItem('quantity');
            if (idInCache && quantityInCache) {
                setSearchParams({
                    productId: idInCache,
                    quantity: quantityInCache
                });
            }
        }
    }, [searchParams]);

    const [orderId, setOrderId] = useState<number>(0);

    const [newCount, setNewCount] = useState<number>(quantity);
    // Use state lifting:
    // a simple solution to share state between parent and child components
    const handleCounterChange = (count: number) => {
        setNewCount(count);
    };

    const checkout = () => {
        if (product && productId && quantity) {
            fetch(`${globals.API_PREFIX}/orders`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId,
                    quantity: newCount, // user can adjust the quantity in the cart
                })
            })
            .then(res => res.json())
            .then(result => {
                if (result.code === 200) {
                    const data = result.data;
                    setOrderId(data.id);
                } else {
                    throw new Error(result.message);
                }
            })
            .then(() => { // clean cache after order submitted
                localStorage.removeItem('productId');
                localStorage.removeItem('quantity');
            })
            .catch(err => {
                console.error(err);
            });
        }
    };

    const clean = () => {
        localStorage.removeItem('productId');
        localStorage.removeItem('quantity');
        navigate('/cart', { replace: true }); // use "replace" to prevent go to the previous page by clicking "BACK" from the browser
        //window.location.reload(); // refresh page by force, but not a good idea
        setProduct(null);
    };

    const goToOrder = () => {
        // use "navigate" but not <Link>, to prevent autoset the localStorage by clicking "BACK" from browser
        navigate(`/order/${orderId}`, { replace: true });
    };

    return (
        <div className="panel-view">
            {product ? (
                <>
                    <img className="product-image" src={product.image} alt={product.name} />
                    <div className="product">
                        <div className="product-name">{ product.name }</div>
                        <p className="product-stock">{ product.stock } in stock</p>
                        <span className="product-price">${ product.price.toFixed(2) }</span>
                        <Counter max={product?.stock} initCount={quantity} onCounterChange={handleCounterChange} />
                        <span className="product-price" style={{color: 'lightgreen'}}>Total: ${ (product.price * newCount).toFixed(2) }</span>
                        <div className="cart-action">
                            <button className="cart-action-checkout" onClick={checkout} disabled={orderId > 0}>Checkout</button>
                            <button className="cart-action-clean" onClick={clean} disabled={orderId > 0}>Clean</button>
                        </div>
                        {orderId > 0 && (
                            <div className="cart-message">Great! Now check Order <a onClick={goToOrder}>#{ orderId }</a></div>
                        )}
                    </div>
                </>
            ) : (
                <div className="cart-empty">Cart is empty.</div>
            )}
        </div>
    );
}
