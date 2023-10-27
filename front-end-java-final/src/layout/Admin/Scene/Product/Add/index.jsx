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

function AddProduct() {
    return (
        <motion.div className="">
            {/* modal */}
            {/* {confirmRemoveMember && (
                <ModalConfirmRemove
                    onClose={() => {
                        setConfirmRemoveMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalConfirmRemove>
            )} */}

            {/* {editMember === true && (
                <ModalEditMember
                    onClose={() => {
                        setEditMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalEditMember>
            )} */}
            {/* end modal */}
            <SubHeader nameHeader={'Products'} sub="Add" main="Products"></SubHeader>
            <AnimateOpacity>
                <motion.div className="p-4 rounded-md bg-light dark:bg-dark mt-10">
                    <motion.div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <TextMain>Add product</TextMain>
                    </motion.div>
                </motion.div>

                <div className=""></div>
            </AnimateOpacity>
        </motion.div>
    );
}

export default AddProduct;
