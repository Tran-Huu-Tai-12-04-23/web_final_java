import { useState } from 'react';
import { Editor } from '../../../../../components';

function ManagerProduct() {
    const [data, setData] = useState('');

    return (
        <div>
            <Editor
                onChange={(data) => {
                    setData(data);
                }}
            />

            {JSON.stringify(data)}
        </div>
    );
}

export default ManagerProduct;
