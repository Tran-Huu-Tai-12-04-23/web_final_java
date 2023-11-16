import Child2 from './child2';

function Child1({ count }) {
    return (
        <div>
            <Child2 count={count}></Child2>
        </div>
    );
}

export default Child1;
