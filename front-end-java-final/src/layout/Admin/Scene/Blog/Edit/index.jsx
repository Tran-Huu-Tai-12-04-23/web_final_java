import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import AddBlog from '../Add/index';
import { productDemo } from '../../../../../assets/data';
import { request } from '../../../../../services';

function BlogEdit({}) {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request('GET', `/api/v1/admin/blog/${id}`);

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.error(`Failed to fetch data. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error during data fetching:', error);
            }
        };

        fetchData();
    }, [id]);

    return <AddBlog modeEdit={true} data={data}></AddBlog>;
}

export default BlogEdit;
