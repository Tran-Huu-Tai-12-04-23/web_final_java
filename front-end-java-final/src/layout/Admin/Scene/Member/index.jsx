import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SubHeader from '../../Includes/SubHeader';
import { AnimateHover, AnimateOpacity } from '../../../../components/Animate';
import { Button, Input, TextMain, Select, TableCustom } from '../../../../components';

import { IoIosAdd } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';

import { WrappedColumnsTableMember } from '../../../../assets/data';
import ModalConfirmRemove from '../../Includes/ModalConfirmRemove';
import ModalEditMember from './ModalEditMember';
import ModalAddNewMember from './ModalAddNewMember';
import { request } from '../../../../services';
import ModalConfirmBlockMember from './ModelConfirmBlockMember';
import { useLoading } from '../../../../context/loadingContext';

function ManagerMember() {
    const { startLoading, stopLoading } = useLoading();
    const [confirmRemoveSoftMember, setConfirmRemoveSoftMember] = useState(false);
    const [confirmBlockMember, setConfirmBlockMember] = useState(false);
    const [editMember, setEditMember] = useState(false);
    const [memberSelected, setMemberSelected] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(true);
    const [data, setData] = useState([]);
    const [memberIdForRemove, setMemberIdForRemove] = useState(null);
    const [memberIdForBlock, setMemberIdForBlock] = useState(null);
    const [dataEdit, setDataEdit] = useState(null);
    const [addNewMember, setAddNewMember] = useState(false);

    const columnsMember = WrappedColumnsTableMember({
        onRemove: (value) => {
            setConfirmRemoveSoftMember(true);
            setMemberIdForRemove(value);
        },
        onEdit: (value) => {
            setDataEdit(data.find((dt) => dt.id === value));
            setEditMember(true);
        },
        onBlock: (value) => {
            setMemberIdForBlock(value);
            setConfirmBlockMember(true);
        },
        onUnLock: async (value) => {
            await unLockMember(value);
        },
    });

    const handleRemoveSoftMember = async () => {
        try {
            await request('DELETE', '/api/v1/admin/member/delete-soft?id=' + memberIdForRemove)
                .then((response) => {
                    if (!response) {
                        return Promise.reject(false);
                    }
                    setData((prev) => prev.filter((dt) => dt.id !== memberIdForRemove));
                    setMemberIdForRemove(null);
                    return Promise.resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                    return Promise.reject(false);
                });
        } catch (error) {
            console.error(error);
            return Promise.reject(false);
        }
    };

    const removeSoftMember = async () => {
        if (memberIdForRemove == null) return;

        toast.promise(handleRemoveSoftMember(), {
            loading: 'Đang xóa ...',
            success: <b>Delete successful!</b>,
            error: <b>Delete failed.</b>,
        });
    };

    const handleUnLockMember = async (value) => {
        try {
            await request('GET', '/api/v1/admin/member/un-lock?id=' + value)
                .then((response) => {
                    if (!response) {
                        return Promise.reject(false);
                    }
                    setData((prev) =>
                        prev.map((dt) => {
                            if (dt.id === value) {
                                return {
                                    ...dt,
                                    status: true,
                                };
                            }

                            return dt;
                        }),
                    );
                    setMemberIdForBlock(null);
                    return Promise.resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                    return Promise.reject(false);
                });
        } catch (error) {
            console.error(error);
            return Promise.reject(false);
        }
    };
    const handleBlockMember = async () => {
        try {
            await request('GET', '/api/v1/admin/member/block?id=' + memberIdForBlock)
                .then((response) => {
                    if (!response) {
                        return Promise.reject(false);
                    }
                    setData((prev) =>
                        prev.map((dt) => {
                            if (dt.id === memberIdForBlock) {
                                return {
                                    ...dt,
                                    status: false,
                                };
                            }

                            return dt;
                        }),
                    );
                    setMemberIdForBlock(null);
                    return Promise.resolve(true);
                })
                .catch((err) => {
                    console.log(err);
                    return Promise.reject(false);
                });
        } catch (error) {
            console.error(error);
            return Promise.reject(false);
        }
    };
    const unLockMember = async (value) => {
        toast.promise(handleUnLockMember(value), {
            loading: 'Mở khóa ...',
            success: <b>Unlock member successful!</b>,
            error: <b>Unlock member failed.</b>,
        });
    };
    const blockMember = async (value) => {
        if (memberIdForBlock == null) return;

        toast.promise(handleBlockMember(value), {
            loading: 'Đang chặn ...',
            success: <b>Block member successful!</b>,
            error: <b>Block member failed.</b>,
        });
    };

    const searchData = async () => {
        let URL = `/api/v1/admin/member/search?key=${search}&&page=0&&size=30&&status=${status}&&isDelete=${false}`;
        startLoading();
        await request('GET', URL)
            .then((res) => {
                if (!res.data) return;
                const dataRes = res.data;

                const dataF = dataRes.map((dt) => {
                    const idMember = dt.id;
                    return {
                        ...dt,
                        username: dt?.account?.username,
                        id: idMember,
                    };
                });
                setData(dataF);
            })
            .catch((err) => {
                console.log(err);
            });
        stopLoading();
    };
    const getData = async () => {
        let URL = `/api/v1/admin/member?page=0&&size=30&&status=${status}&&isDelete=${false}`;
        startLoading();
        await request('GET', URL)
            .then((res) => {
                if (!res.data) return;
                const dataRes = res.data;

                const dataF = dataRes.map((dt) => {
                    const idMember = dt.id;
                    return {
                        ...dt,
                        username: dt?.account?.username,
                        id: idMember,
                    };
                });
                setData(dataF);
            })
            .catch((err) => {
                console.log(err);
            });
        stopLoading();
    };

    useEffect(() => {
        if (search) {
            searchData();
        } else {
            getData();
        }
    }, [search]);

    useEffect(() => {
        getData();
    }, [status]);

    return (
        <div>
            {/* modal */}
            {addNewMember && (
                <ModalAddNewMember
                    onClose={() => {
                        setAddNewMember(false);
                    }}
                    setListMember={setData}
                    onCancel={() => {}}
                ></ModalAddNewMember>
            )}
            {confirmRemoveSoftMember && (
                <ModalConfirmRemove
                    onClose={() => {
                        setConfirmRemoveSoftMember(false);
                    }}
                    onRemove={removeSoftMember}
                    onCancel={() => {}}
                ></ModalConfirmRemove>
            )}

            {confirmBlockMember && (
                <ModalConfirmBlockMember
                    onClose={() => {
                        setConfirmBlockMember(false);
                    }}
                    onConfirm={blockMember}
                    onCancel={() => {}}
                ></ModalConfirmBlockMember>
            )}

            {editMember === true && (
                <ModalEditMember
                    setListMember={setData}
                    data={dataEdit}
                    onClose={() => {
                        setEditMember(false);
                    }}
                    onCancel={() => {}}
                ></ModalEditMember>
            )}
            {/* end modal */}
            <SubHeader nameHeader={'Members'} sub="Manager" main="Member"></SubHeader>
            <AnimateOpacity>
                <div className="p-4 rounded-md bg-light dark:bg-dark mt-10">
                    <div className="flex justify-between items-center border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <TextMain>Danh sách thành viên</TextMain>
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
                            <Button style="normal" onClick={(e) => setAddNewMember(true)}>
                                <IoIosAdd className="w-6 h-6 mr-2"></IoIosAdd>
                                <span>Thêm thành viên</span>
                            </Button>
                        </div>
                    </div>

                    {/* //feature filter */}
                    <div className="flex mb-4 2xl:flex-row xl:flex-row lg:flex-row flex-col justify-between items-center mt-5 gap-4  border-b-[1px] border-dashed pb-4 dark:border-dark-tiny border-light-tiny">
                        <Input
                            placeholder="Search for name, email, phone number, something, ... "
                            className="w-full"
                            onChange={(e) => setSearch(e.target.value)}
                            iconRight={<IoSearchOutline className="w-6 h-6 mr-3"></IoSearchOutline>}
                        ></Input>

                        <Select
                            className="w-fit "
                            name="Trạng thái"
                            value={status}
                            onSelect={(value) => {
                                setStatus(value);
                            }}
                            subMenu={[
                                {
                                    name: 'Hoạt động',
                                    value: true,
                                },
                                {
                                    name: 'Bị chặn',
                                    value: false,
                                },
                            ]}
                        ></Select>
                    </div>

                    {/* Table */}

                    <TableCustom
                        columns={columnsMember}
                        data={data}
                        checked={true}
                        numberRow={10}
                        pagination={true}
                        setCheckedData={setMemberSelected}
                    ></TableCustom>
                </div>
            </AnimateOpacity>
        </div>
    );
}

export default ManagerMember;
