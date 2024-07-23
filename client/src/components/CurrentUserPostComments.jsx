import { Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CurrentUserPostComments = () => {
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        const fetchUserPostComments = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/comment/getParticularUserPostComments/${currentUser._id}`);
                const data = await res.json();

                if (!res.ok) {
                    console.log("error in res json : ", data.message);
                } else {
                    // console.log("user post comments : ", data.commentsInfo);
                    setComments(data.commentsInfo);
                    setLoading(false);
                }
                // console.log("currentUser : ", currentUser);
            } catch (err) {
                console.log("error in getting particular user post comments : ", err);
            }
        }

        fetchUserPostComments();
    }, [])

    console.log("comments : ", comments);

    if (loading == true) return (
        <>
            <div className='min-h-screen flex justify-center items-center'>
                <Spinner size="xl" />
            </div>
        </>
    )
    return (
        <>
            {comments.length == 0 ? <>
                <div className='min-h-screen flex justify-center items-center'>
                    <div className='text-2xl italic text-gray-500'>No Post Comment Yet 😔</div>
                </div>
            </>
                :
                <>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>
                                <span className="sr-only">show</span>
                            </Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>User Id</Table.HeadCell>
                            <Table.HeadCell>Post Id</Table.HeadCell>
                            <Table.HeadCell>Comment</Table.HeadCell>
                            {/* <Table.HeadCell>
                                <span className="sr-only">delete</span>
                            </Table.HeadCell> */}
                        </Table.Head>

                        <Table.Body className="divide-y">
                            {
                                comments.map((comment) => {
                                    return (

                                        <Table.Row key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>
                                                <a onClick={() => {
                                                    navigate(`/post/${comment.postId}`)
                                                }} className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    show
                                                </a>
                                            </Table.Cell>
                                            <Table.Cell>{new Date(comment.createdAt).toLocaleString()}</Table.Cell>
                                            <Table.Cell>{comment.userId}</Table.Cell>
                                            <Table.Cell>
                                                {
                                                   comment.postId
                                                }

                                            </Table.Cell>
                                            <Table.Cell>{comment.comment}</Table.Cell>

                                            {/* <Table.Cell>
                                                <a onClick={() => { setOpenModal(true), setPostIdToDelete(post._id) }} className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500">
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
                                                                <Button color="failure" onClick={handleDeletePost}>
                                                                    {"Yes, I'm sure"}
                                                                </Button>
                                                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                                                    No, cancel
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                </Modal>
                                            </Table.Cell> */}

                                        </Table.Row>

                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </>
            }
        </>
    )
}

export default CurrentUserPostComments