import { useContext } from 'react';
import { contextCount } from './parent';
function Child2({}) {
    const [count  ] = useContext(contextCount);

    console.log(count);
    return (
        <div className="bg-red h-20 w-10">
            hello
            {count}
        </div>
    );
}

export default Child2;
