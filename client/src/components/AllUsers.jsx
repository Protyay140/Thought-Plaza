import { Button, Modal, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const { currentUser } = useSelector(state => state.user);
    const [users, setUsers] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [showMore, setShowMore] = useState(true);
    const [userIdToDelete, setUserIdToDelete] = useState();
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL;
                const data = await fetch(`${baseUrl}/api/user/getUsers?userId=${currentUser._id}&limit=9`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const res = await data.json();

                if (!data.ok) {
                    console.log('error in user json');
                } else {
                    setUsers(res.postInfo.users);
                    console.log('fetch users length : ', res.postInfo.users.length);
                    if (res.postInfo.users.length < 9) {
                        setShowMore(false);
                    }
                }
                setLoadingUser(false);
            } catch (err) {
                console.log('error in getting the users : ', err);
            }

        }

        // if (currentUser.isAdmin) {
        fetchUsers();
        // }
    }, [currentUser._id]);


    const handleShowMore = async () => {
        try {
            const startFrom = users.length;
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const data = await fetch(`${baseUrl}/api/user/getUsers?userId=${currentUser._id}&startFrom=${startFrom}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const res = await data.json();

            if (!data.ok) {
                console.log('error in user json');
            } else {
                setUsers((prev) => [...prev, ...res.postInfo.users]);
                console.log('fetch user length : ', res.postInfo.users.length);
                if (res.postInfo.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (err) {
            console.log('error in show more functionality : ', err);
        }
    }


    const handleDeleteUser = async () => {
        setOpenModal(false);
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const data = await fetch(`${baseUrl}/api/user/deleteUsers/${userIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await data.json();
            if (!data.ok) {
                console.log("response : ", res);
                toast.error(res.message, {
                    position: 'top-center'
                });
            } else {
                setUsers((prev) =>
                    prev.filter((user) => user._id != userIdToDelete)
                )
                toast.success('user deleted', {
                    position: 'top-center'
                })
            }
            console.log("user deleted : ", userIdToDelete);
        } catch (err) {
            console.log("error in deleting user : ", err);
        }
    }

    console.log('users : ', users);

    return (
        <>
            {
                loadingUser == false ? <>
                    <div className='overflow-x-auto '>
                        {
                            users?.length > 0 ? <>
                                <Table hoverable>
                                    <Table.Head>

                                        <Table.HeadCell>Username</Table.HeadCell>
                                        <Table.HeadCell>User Image</Table.HeadCell>
                                        <Table.HeadCell>Email Id</Table.HeadCell>
                                        <Table.HeadCell>Created At</Table.HeadCell>
                                        <Table.HeadCell>Admin</Table.HeadCell>
                                        <Table.HeadCell>
                                            <span className="sr-only">delete</span>
                                        </Table.HeadCell>
                                    </Table.Head>

                                    <Table.Body className="divide-y">
                                        {
                                            users.map((user) => {
                                                return (

                                                    <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                                        <Table.Cell>{user.username}</Table.Cell>

                                                        <Table.Cell>
                                                            {
                                                                user.profileImage ? <>
                                                                    <img src={user.profileImage} alt="postImage" className='h-12 rounded-full' />
                                                                </> :
                                                                    <>
                                                                        <p className=''>---</p>
                                                                    </>
                                                            }

                                                        </Table.Cell>
                                                        <Table.Cell>{user.email}</Table.Cell>
                                                        <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
                                                        <Table.Cell>
                                                            {
                                                                user.isAdmin ? <>
                                                                    <p>
                                                                        ✅
                                                                    </p>
                                                                </> :
                                                                    <>
                                                                        <p>
                                                                            ❌
                                                                        </p>
                                                                    </>
                                                            }
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <a onClick={() => { setOpenModal(true), setUserIdToDelete(user._id) }} className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                                delete
                                                            </a>
                                                            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                                                <Modal.Header />
                                                                <Modal.Body>
                                                                    <div className="text-center">
                                                                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                            Are you sure you want to delete this post?
                                                                        </h3>
                                                                        <div className="flex justify-center gap-4">
                                                                            <Button color="failure" onClick={handleDeleteUser}>
                                                                                {"Yes, I'm sure"}
                                                                            </Button>
                                                                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                                                                No, cancel
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </Table.Cell>

                                                    </Table.Row>

                                                )
                                            })
                                        }
                                    </Table.Body>
                                </Table>
                                {
                                    showMore && <>
                                        <p className='text-center mt-3 font-bold text-green-400'>
                                            <button onClick={handleShowMore}>. . . . Show More . . . .</button>
                                        </p>
                                    </>
                                }
                            </> :
                                <>
                                    <p className='text-center mt-3 font-bold text-2xl italic'>You haven't publish any post yet !!!</p>
                                </>
                        }
                    </div>
                </> :
                    <>
                        <div className='min-h-screen flex justify-center items-center'>
                            <Spinner size="xl"/>
                        </div>
                    </>
            }

        </>

    )
}

export default AllUsers;