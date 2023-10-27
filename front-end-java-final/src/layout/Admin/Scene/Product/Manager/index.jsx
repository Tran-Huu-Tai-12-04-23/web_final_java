import { useState } from 'react';

import { motion } from 'framer-motion';
import SubHeader from '../../../Includes/SubHeader';
import { AnimateHover, AnimateOpacity } from '../../../../../components/Animate';
import { Button, Input, TextMain, PickedRangeDate, Select, TableCustom, Editor } from '../../../../../components';

import { IoIosAdd } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { GiSettingsKnobs } from 'react-icons/gi';
import { BsTrash } from 'react-icons/bs';

import { productManagersItems, WrappedColumnsTableProduct } from '../../../../../assets/data';
import ModalConfirmRemove from '../../../Includes/ModalConfirmRemove';

function Manager({ setOrder }) {
    const [data, setData] = useState('');

    const [confirmRemoveMember, setConfirmRemoveMember] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [memberSelected, setMemberSelected] = useState([]);
    const columnsProduct = WrappedColumnsTableProduct({
        handleRemove: (value) => {
            setConfirmRemoveMember(true);
        },
        handleEdit: (value) => {
            // setEditMember(true);
            console.log('test');
            setOrder((pre) => {
                return {
                    ...pre,
                    submenu: 3,
                };
            });
        },
    });

    return (
        <>
            {/* modal */}
            {confirmRemoveMember && (
                <ModalConfirmRemove
                    onClose={() => {
                        setConfirmRemoveMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalConfirmRemove>
            )}

            {/* {editMember === true && (
                <ModalEditMember
                    onClose={() => {
                        setEditMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalEditMember>
            )} */}
            {/* end modal */}
            <SubHeader nameHeader={'Products'} sub="Manager" main="Products"></SubHeader>
            <AnimateOpacity>
                <motion.div className="p-4 rounded-md bg-light dark:bg-dark mt-10">
                    <motion.div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <TextMain>Product list</TextMain>
                        <div className="flex justify-end items-center gap-4">
                            {memberSelected.length > 0 && (
                                <AnimateHover
                                    className={
                                        'p-2 rounded-md cursor-pointer bg-[rgba(221,75,78,0.1)] text-[rgb(221,75,78)]'
                                    }
                                >
                                    <BsTrash className="w-6 h-6"></BsTrash>
                                </AnimateHover>
                            )}
                            <Button style="normal">
                                <IoIosAdd className="w-6 h-6 mr-2"></IoIosAdd>
                                <span>Add Product</span>
                            </Button>
                        </div>
                    </motion.div>

                    {/* //feature filter */}
                    <motion.div className="flex mb-4 2xl:flex-row xl:flex-row lg:flex-row flex-col justify-between items-center mt-5 gap-4  border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <Input
                            placeholder="Search for name, email, phone number, something, ... "
                            className="w-full"
                            iconRight={<IoSearchOutline className="w-6 h-6 mr-3"></IoSearchOutline>}
                        ></Input>

                        <motion.div className="flex w-full justify-end items-center gap-5">
                            <PickedRangeDate></PickedRangeDate>
                            <Select className="w-full "></Select>
                            <Button
                                style=""
                                className={
                                    'min-w-[10rem] w-full flex items-center justify-center bg-btn-primary rounded-md text-white'
                                }
                            >
                                <GiSettingsKnobs className="w-6 h-6 mr-3"></GiSettingsKnobs>
                                <span>Filters</span>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Table */}

                    <TableCustom
                        columns={columnsProduct}
                        data={productManagersItems}
                        checked={true}
                        numberRow={10}
                        pagination={true}
                        setCheckedData={setMemberSelected}
                    ></TableCustom>
                </motion.div>
            </AnimateOpacity>
        </>
    );
}

export default Manager;
