// components/DataContext.js
import { createContext, useContext, useState } from 'react';

interface DataContextType {
    sharedData: any;
    updateSharedData: (newData: any) => void;
}

const DataContext = createContext<DataContextType>({ sharedData: null, updateSharedData: () => {} });

// Context API solution:
// to share state between parent and child components
export function SharedDataProvider({ children }: { children: React.ReactNode }) {
    const [sharedData, setSharedData] = useState<any>(null);

    const updateSharedData = (newData: any) => {
        setSharedData(newData);
        console.log(`[=== ELC data updated ===]: ${newData}`);
    };

    return (
        <DataContext.Provider value={{ sharedData, updateSharedData }}>
            { children }
        </DataContext.Provider>
    );
}

export const useSharedData = () => useContext(DataContext);
