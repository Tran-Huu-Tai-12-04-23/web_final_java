import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import SubHeader from '../../../Includes/SubHeader';
import { AnimateHover, AnimateOpacity } from '../../../../../components/Animate';
import {
    Button,
    Input,
    TextMain,
    PickedRangeDate,
    Select,
    TableCustom,
    Editor,
    MultiSelect,
} from '../../../../../components';

import { IoIosAdd } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

import { productManagersItems, WrappedColumnsTableProduct } from '../../../../../assets/data';
import ModalConfirmRemove from '../../../Includes/ModalConfirmRemove';
import Constants from '../../../../../Constants';

import MainFilter from './MainFilter';

function Manager({}) {
    const history = useNavigate();
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState('');
    const [data, setData] = useState('');

    // data

    // filter data
    const [confirmRemoveMember, setConfirmRemoveMember] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [memberSelected, setMemberSelected] = useState([]);
    const columnsProduct = WrappedColumnsTableProduct({
        onRemove: (value) => {
            setConfirmRemoveMember(true);
        },
        onEdit: (value) => {
            history(Constants.ADMIN_EDIT_PRODUCT + '/' + value);
        },
        onView: (value) => {
            history(Constants.ADMIN_DETAIL_PRODUCT + '/' + value);
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
            <AnimateOpacity className={'flex justify-between gap-4'}>
                <motion.div className="p-4 rounded-md bg-light dark:bg-dark mt-10 w-1/5 h-fit flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny pb-2">
                        <TextMain>Filter</TextMain>
                        <Button className="underline underline-primary hover:text-primary brightness-50 hover:brightness-100">
                            Clear all
                        </Button>
                    </div>

                    {/* main filter */}
                    <MainFilter filters={filters} setFilters={setFilters}></MainFilter>

                    {/* end main filter */}
                </motion.div>
                <motion.div className="p-4 rounded-md bg-light dark:bg-dark mt-10 w-4/5">
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
                            <Button style="normal" onClick={() => history(Constants.ADMIN_ADD_PRODUCT)}>
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
