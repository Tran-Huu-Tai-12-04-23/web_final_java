import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { request } from '../../../services/index';
import { TextMain, DisplayHTMLContent } from '../../../components';
import Util from '../../../utils/Util';

function DetailBlog() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            await request('GET', '/api/v1/admin/blog/' + id)
                .then((res) => {
                    if (res.status === 200) {
                        setData(res.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        fetch();
    }, []);

    return (
        <div className="relative max-w-screen-xl m-auto ">
            <div className="w-full flex justify-center items-center bg-contain max-h-[40rem] h-[40vh] border-primary-style rounded-md">
                <img src={data?.thumbnails} className="h-full rounded-md"></img>
            </div>

            <div className=" bg-light-tiny w-[96%] -translate-y-10  m-auto flex flex-col gap-4 dark:bg-dark-tiny rounded-md shadow-2xl p-4">
                <TextMain className={'font-bold text-xl'}>{data?.title}</TextMain>

                <div className="flex justify-start items-center gap-3">
                    <img
                        src={'https://secure.gravatar.com/avatar/afde80d1fe8bcfb4f5f0a71592ae1b6e?s=96&d=mm&r=g'}
                        alt="ADMIN"
                        className="w-10 h-10 rounded-full"
                    ></img>
                    <div className="flex justify-start items-start flex-col">
                        <TextMain>Admin</TextMain>
                        <TextMain>{Util.convertTimeStamp(data?.createAt)}</TextMain>
                    </div>
                </div>

                <div className="p-4 m-auto">
                    <DisplayHTMLContent htmlContent={data?.content}></DisplayHTMLContent>
                </div>
            </div>
        </div>
    );
}

export default DetailBlog;
