import { motion } from 'framer-motion';
import { Tooltip } from 'flowbite-react';
import { ContactSocial } from '../../assets/data/index';
import { Main } from '../../layout';
import Banner from './Banner';

function Footer() {
    const renderContactSocial = () => {
        return ContactSocial.map((social, index) => {
            return (
                <motion.div
                    className="ml-4 cursor-pointer"
                    key={index}
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    whileTap={{
                        scale: 0.9,
                        borderRadius: '10%',
                        transition: { duration: 0.3 },
                    }}
                >
                    <Tooltip content={social.name}>{social.icon}</Tooltip>
                </motion.div>
            );
        });
    };
    return (
        <div className="w-full">
            <Banner></Banner>
            <Main
                className={
                    'text-white pt-32 dark:text-white shadow-inner bg-gradient-to-b from-[#ef7f9b] to-[#fccfd3] dark:from-[#352f42] dark:to-[#352f42]'
                }
            >
                <div className="flex justify-between">
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Home</div>
                        <a className="my-3 block" href="/#">
                            Services <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Products <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            About Us <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Pricing <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Partners <span className="text-white text-xs p-1">New</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">User</div>
                        <a className="my-3 block" href="/#">
                            Sign in <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            New Account <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Demo <span className="text-white text-xs p-1">New</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Resources</div>
                        <a className="my-3 block" href="/#">
                            Support <span className="text-white text-xs p-1">New</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Product</div>
                        <a className="my-3 block" href="/#">
                            Our Products <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Great Deals <span className="text-white text-xs p-1">New</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Support</div>
                        <a className="my-3 block" href="/#">
                            Help Center <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Privacy Policy <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Conditions <span className="text-white text-xs p-1"></span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Contact us</div>
                        <a className="my-3 block" href="/#">
                            012345678910, HCM <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            getTech@company.com <span className="text-white text-xs p-1"></span>
                        </a>
                    </div>
                </div>
                <div
                    className="flex pb-5 px-3 m-auto pt-5 border-t  text-sm flex-col
      md:flex-row "
                >
                    <div className="mt-2">© Copyright 2023. All Rights Reserved.</div>
                    <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">{renderContactSocial()}</div>
                </div>
            </Main>
        </div>
    );
}

export default Footer;
