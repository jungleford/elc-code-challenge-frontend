import { useState, useEffect } from 'react';

import './style.scss';

export function Counter({initCount = 1, max = 1, onCounterChange}: {initCount?: number, max?: number, onCounterChange?: (count: number) => void}) {
    const [count, setCount] = useState(initCount || 1);

    useEffect(() => {
        if (onCounterChange) {
            // Use state lifting:
            // a simple solution to share state between parent and child components
            onCounterChange(count);
        }
    }, [count]);

    const handleIncrement = () => {
        if (count < max) {
            setCount(count => count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count => count - 1);
        }
    };

    // Use <input> as a controlled component (two-way binding)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= max) {
            setCount(value);
        }
    };

    return (
        <div className="counter">
            <button onClick={handleDecrement}>-</button>
            <input type="number" min="1" max={max} value={count} onChange={handleChange} />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
}
