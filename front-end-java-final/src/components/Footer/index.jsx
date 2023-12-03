import { motion } from 'framer-motion';

import { ContactSocial } from '../../assets/data/index';
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
                    {social.icon}
                </motion.div>
            );
        });
    };
    return (
        <div className="w-full">
            <Banner></Banner>
            <div
                className={
                    '  pl-10 pr-10 text-white pt-36 pb-20 dark:text-white shadow-inner bg-gradient-to-b from-[#ef7f9b] to-[#fccfd3] dark:from-[#352f42] dark:to-[#352f42]'
                }
            >
                <div className="flex justify-between flex-wrap">
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Trang chủ</div>
                        <a className="my-3 block" href="/#">
                            Dịch vụ <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Sản phẩm <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Về chúng tôi <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Giá cả <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Đối tác <span className="text-white text-xs p-1">Mới</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Người dùng</div>
                        <a className="my-3 block" href="/#">
                            Đăng nhập <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Tạo tài khoản <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Demo <span className="text-white text-xs p-1">Mới</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Nguồn</div>
                        <a className="my-3 block" href="/#">
                            Hỗ trợ <span className="text-white text-xs p-1">Mới</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Sản phẩm</div>
                        <a className="my-3 block" href="/#">
                            Sản phẩm của chúng tôi <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Deal giá hời <span className="text-white text-xs p-1">Mới</span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Hỗ trợ</div>
                        <a className="my-3 block" href="/#">
                            Trung tâm hỗ trợ <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Chính sách bảo mật <span className="text-white text-xs p-1"></span>
                        </a>
                        <a className="my-3 block" href="/#">
                            Điều kiện <span className="text-white text-xs p-1"></span>
                        </a>
                    </div>
                    <div className="p-5 w-48 ">
                        <div className="text-xs uppercase text-gray-200 font-medium">Liên hệ chúng tôi</div>
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
            </div>
        </div>
    );
}

export default Footer;
