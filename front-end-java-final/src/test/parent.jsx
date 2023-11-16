import { createContext, useState } from 'react';
import Child1 from './child1';

export const contextCount = createContext(null);

function Parent({ children }) {
    const [count, setCount] = useState(0);
    return (
        <contextCount.Provider value={[count]}>
            <Child1></Child1>
        </contextCount.Provider>
    );
}

export default Parent;
