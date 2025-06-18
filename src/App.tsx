import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import logo from'./assets/react.svg';
import './App.scss';

// App includes Home and Layout
function App() {
    const [title, setTitle] = useState('Product Store');
    const [currentRoute, setCurrentRoute] = useState('/products');
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        setCurrentRoute(path);
        switch (path) {
            case '/cart':
                setTitle('Shopping Cart');
                break;
            case '/orders':
                setTitle('Order List');
                break;
            case '/products':
            default:
                setTitle('Product Store');
                break;
        }
    }, [location]);

    return (
        <div className="app">
            <div className="app-header">
                <img className="app-logo" src={logo} alt="Placeholder Logo" />
                <h1 className="app-title">{title}</h1>
                <div className="app-nav">
                    <Link
                        className={currentRoute === '/products' ? 'app-nav-link active' : 'app-nav-link'}
                        to="/products"
                        title="Go to Store"
                    > 🏷️ </Link>
                    <Link
                        className={currentRoute === '/orders' ? 'app-nav-link active' : 'app-nav-link'}
                        to="/orders"
                        title="Go to Orders"
                    > 📜 </Link>
                    <Link
                        className={currentRoute === '/cart' ? 'app-nav-link active' : 'app-nav-link'}
                        to="/cart"
                        title="Go to Cart"
                    > 🛒 </Link>
                </div>
            </div>

            <div className="app-body">
                <Outlet />
            </div>
        </div>
    )
}

export default App;
