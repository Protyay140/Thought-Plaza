import { Button, Modal, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AllComments from './AllComments';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const Comment = ({ postId }) => {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [commentIdToDelete,setCommentIdToDelete] = useState();
    console.log('postId : ', postId);
    // console.log('userId : ', currentUser._id);
    const [userComments, setUserComments] = useState([]);
    useEffect(() => {

        const fetchComments = async () => {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL;
                const res = await fetch(`${baseUrl}/api/comment/getComments/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await res.json();
                if (!res.ok) {
                    console.log('error in getting comments response : ', data.message);
                } else {
                    console.log("getting response successfully : ", data);
                    setUserComments(data.commentInfo);
                }
            } catch (err) {
                console.log("error in getting the comments : ", err);
            }
        }

        fetchComments();
    }, [postId]);

    // console.log('user comments : ', userComments);

    const handleSubmmitComment = async () => {
        try {
            if (comment.length == 0) {
                return toast.error('can not do empty comment !', {
                    position: 'top-center'
                })
            }
            if (comment.length > 150) {
                return toast.error('character limit exceeded !', {
                    position: 'top-center'
                })
            }

            const baseUrl = import.meta.env.VITE_BASE_URL;
            const res = await fetch(`${baseUrl}/api/comment/create-comment`, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    postId: postId,
                    comment: comment
                })
            })

            const data = await res.json();
            if (!res.ok) {
                return toast.error(data.message, {
                    position: 'top-center'
                });
            } else {
                console.log('comment : ', data.commentInfo)
                // toast.success(data.message, {
                //     position: 'top-center'
                // });
                setUserComments([data.commentInfo, ...userComments])
                setComment('');
            }

        } catch (err) {
            console.log('error in submiting the comment : ', err);
        }
    }


    const handleDelete = async () => {
        try {
            // alert(commentId);
            setOpenModal(false);
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const res = await fetch(`${baseUrl}/api/comment/delete-comment/${commentIdToDelete}`,{
                method : 'DELETE',
                credentials : 'include',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            const data = await res.json();
            if(!res.ok){
                toast.error(data.message,{position : 'top-center'});
            }else{
                setUserComments(userComments.filter((comment)=> comment._id != commentIdToDelete));
            }
        } catch (err) {
            console.log('error in deleting the comment : ', err);
        }
    }

    return (
        <div className=' flex flex-col'>
            {
                currentUser ? <>
                    <div className="user flex gap-2 text-sm mb-2">
                        <div>Signed in as : </div>
                        <div className='flex gap-2 '>
                            <img src={currentUser.profileImage} alt="userImage" className='h-6 rounded-full' />
                            <div className='font-bold text-[#06b6d4]'>@{currentUser.username}</div>
                        </div>
                    </div>

                </> :
                    <>
                        <p className='text-sm mb-2'>please signed in to comment . <span className='font-bold text-[#06b6d4]'><Link to='/sign-in'>sign-in</Link></span></p>
                    </>
            }
            {currentUser && <>
                <div className='flex flex-col text-sm gap-2'>
                    <Textarea
                        placeholder='add a comment . . . . . .'
                        rows='3'
                        maxLength='150'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className='flex justify-between'>
                        <p className='text-gray-500'>{150 - comment.length} characters remaining</p>
                        <button onClick={handleSubmmitComment} className='border p-2 px-3 rounded-2xl hover:text-white hover:bg-slate-600'>comment</button>
                    </div>
                </div>

            </>}
            <div className='flex gap-2 text-sm font-bold'>
                <div>Comments</div>
                <div className='border px-2 rounded-md'>{userComments.length}</div>
            </div>
            {
                (userComments.length == 0) ?
                    <>
                        <div className='text-center mt-2 text-sm italic text-gray-600 font-bold'>No Commment Yet .</div>
                    </> : <>
                        {
                            userComments.map((comment) => {
                                return (
                                    <AllComments key={comment?._id} comment={comment}
                                        onDelete={(commentId) => {
                                           setOpenModal(true);
                                           setCommentIdToDelete(commentId);
                                        }} />
                                )
                            })
                        }
                    </>
            }
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDelete}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Comment