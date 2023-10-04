import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Main } from '../index';
import { Card } from '../../components/index';
function Home() {
    const [selectedId, setSelectedId] = useState(null);
    const items = [
        {
            id: '1',
        },
        {
            id: '2',
        },
        {
            id: '3',
        },
        {
            id: '4',
        },
        {
            id: '5',
        },
        {
            id: '6',
        },
    ];

    return (
        <Main className="h-screen mt-header">
            <div className="mt-40 flex justify-start items-center flex-wrap gap-5">
                {items.map((item) => (
                    <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
                        <Card></Card>
                    </motion.div>
                ))}

                {selectedId && (
                    <div
                        onClick={() => setSelectedId(null)}
                        className="fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-lg"
                    >
                        {' '}
                    </div>
                )}
                <AnimatePresence>
                    {selectedId && (
                        <motion.div
                            className=" bg-primary "
                            style={{
                                position: 'fixed',
                                top: '45%',
                                left: '45%',
                            }}
                            layoutId={selectedId}
                        >
                            <motion.div className="w-full bg-red-500">
                                <motion.button onClick={() => setSelectedId(null)}>Close</motion.button>
                                <motion.div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <motion.a href="#">
                                        <motion.img
                                            className="rounded-t-lg"
                                            src="/docs/images/blog/image-1.jpg"
                                            alt=""
                                        />
                                    </motion.a>
                                    <motion.div className="p-5">
                                        <motion.a href="#">
                                            <motion.h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                Noteworthy technology acquisitions 2021
                                            </motion.h5>
                                        </motion.a>
                                        <motion.p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            Here are the biggest enterprise technology acquisitions of 2021 so far, in
                                            reverse chronological order.
                                        </motion.p>
                                        <motion.a
                                            href="#"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Read more
                                            <motion.svg
                                                className="w-3.5 h-3.5 ml-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 10"
                                            >
                                                <motion.path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                                />
                                            </motion.svg>
                                        </motion.a>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Main>
    );
}

export default Home;
