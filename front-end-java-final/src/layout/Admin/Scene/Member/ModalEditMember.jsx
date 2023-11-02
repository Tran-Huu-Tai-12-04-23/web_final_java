import { useState } from 'react';
import { Input, Select, TextMain } from '../../../../components';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { Modal, ModalItem } from '../../../../components';

import { Datepicker } from 'flowbite-react';

function ModalEditMember({ onRemove = () => {}, onCancel = () => {}, onClose = () => {}, data }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [deleted, setDeleted] = useState(false);
    const [createAt, setCreateAt] = useState(new Date());
    const [focus, setFocus] = useState(false);

    const [close, setClose] = useState(false);

    return (
        <Modal onClose={() => setClose(true)}>
            <ModalItem onClose={onClose} close={close}>
                <div className="min-w-[30rem]">
                    <TextMain
                        className={
                            'font-bold text-xl border-b-[1px] border-dashed border-light-tiny dark:border-dark-tiny pb-4'
                        }
                    >
                        Edit Member
                    </TextMain>

                    <div className="flex flex-col mt-4">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name member"
                            label={'Name'}
                            className="mb-4"
                        ></Input>

                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email member"
                            label={'Email'}
                            className="mb-4"
                        ></Input>

                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone number of member"
                            label={'Phone number'}
                            className="mb-4"
                        ></Input>

                        <label className="mb-2  ml-1">Join date</label>
                        <div className="relative z-[1000000]">
                            <Datepicker
                                defaultDate={createAt}
                                className=" bg-transparent w-full mb-4 outline-none rounded-lg focus:ring-transparent focus:border-primary focus:outline-none border-none"
                                onSelectedDateChanged={(date) => setCreateAt(date)}
                            />
                        </div>

                        <label className="mb-2 ml-1">Status</label>
                        <Select
                            name="Status"
                            subMenu={[
                                {
                                    name: 'Active',
                                    value: false,
                                },
                                {
                                    name: 'Block',
                                    value: true,
                                },
                            ]}
                            value={deleted}
                            setValue={setDeleted}
                            className={'p-2'}
                        ></Select>

                        <div className="flex justify-end items-center border-t-[1px] border-dashed border-light-tiny dark:border-dark-tiny mt-5 pt-5 pb-5 gap-4">
                            <button
                                onClick={() => {
                                    setClose(true);
                                }}
                                type="button"
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-light-tiny  dark:bg-dark-tiny rounded-md pl-4 pr-4 hover:text-gray-900  dark:text-gray-300 dark:hover:text-white dark:hover:bg-btn-second "
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-md pl-4 pr-4 hover:bg-green-800 focus:outline-none  dark:bg-green-600 dark:hover:bg-green-700 "
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </ModalItem>
        </Modal>
    );
}

export default ModalEditMember;
