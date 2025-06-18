import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import type { Product } from '../../models';
import { Card, Counter } from '../../components';

import './style.scss';

function AddToCart({productId, max = 1}: {productId: number, max?: number}) {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    const [cartEmpty, setCartEmpty] = useState(true);
    useEffect(() => {
        const productId = localStorage.getItem('productId');
        const quantity = localStorage.getItem('quantity');
        if (productId && quantity) {
            setCartEmpty(false);
        }
    }, []);

    // Use state lifting:
    // a simple solution to share state between parent and child components
    const handleCounterChange = (count: number) => {
        setCount(count);
    };

    const addToCart = () => {
        navigate(`/cart?productId=${productId}&quantity=${count}`);
    };

    // But the state lifting solution needs to pass the handler through by props.
    return (
        <>
            <Counter max={max} onCounterChange={handleCounterChange} />
            {cartEmpty ? (
                <button onClick={addToCart} style={{ marginTop: '4px' }}>Add to cart</button>
            ) : (
                <span style={{ color: 'lightgreen', marginTop: '4px' }}>Cart is not empty</span>
            )}
        </>
    );
}

export function Products() {
    const products: Product[] = useLoaderData();

    return (
        <div className="grid-view">
            {products.map((product) => (
                <Card
                    key={product.id}
                    title={product.name}
                    subtitle={`${product.stock} in stock`}
                    content={`$${product.price.toFixed(2)}`}
                    image={product.image}
                    highlightSubtitle={product.stock === 0}
                    ornament={
                        product.stock === 0 ?
                        <span style={{ color: 'red' }}>Insufficient</span> :
                        <AddToCart productId={product.id} max={product.stock} />
                    }
                />
            ))}
        </div>
    );
}
