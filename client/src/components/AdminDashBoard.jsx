import { Carousel, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdCompost } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

const AdminDashBoard = () => {
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    useEffect(() => {

        const fetchTotalUsers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/user/getUsers?userId=${currentUser._id}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log('err in fetching total number of usrs json ', err);
                } else {
                    setTotalUsers(data.postInfo.totalUsers);
                    setLoading(false);
                }
            } catch (err) {
                console.log("error in fetching total number of users : ", err);
            }
        }

        const fetchTotalPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/post/getPosts`);
                const data = await res.json();
                if (!res.ok) {
                    console.log('err in fetching total number of posts json ', err);
                } else {
                    setTotalPosts(data.postInfo.totalPosts);
                    setLoading(false);
                }
            } catch (err) {
                console.log("error in fetching total number of Posts : ", err);
            }
        }

        const fetchTotalComments = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/comment/getAllComments?userId=${currentUser._id}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log('err in fetching total number of comments json ', err);
                } else {
                    setTotalComments(data.commentInfo);
                    setLoading(false);
                }
            } catch (err) {
                console.log("error in fetching total number of comments : ", err);
            }
        }

        fetchTotalUsers();
        fetchTotalPosts();
        fetchTotalComments();
    }, [currentUser]);


    if (loading) return (
        <>
            <div className='flex justify-center min-h-screen items-center'>
                <Spinner size='xl' />
            </div>
        </>
    )
    return (
        <>
            <div className="container border">
                <div className="upper flex justify-center pt-3">
                    <div className="h-40 w-1/3 ">
                        <Carousel>
                            <div className="flex flex-col gap-3 h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                <div className='font-bold flex gap-2 text-2xl italic '>
                                    <div className='mt-1'>
                                        <FaUsers />
                                    </div>
                                    <div className='text-teal-500'>
                                        Total Users
                                    </div>
                                </div>
                                <div className='italic text-xl'>
                                    {totalUsers}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                <div className='font-bold flex gap-2 text-2xl italic'>
                                    <div className='mt-1'>
                                        <MdCompost />
                                    </div>
                                    <div className='text-teal-500'>
                                        Total Posts
                                    </div>
                                </div>
                                <div className='italic text-xl'>
                                    {totalPosts}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                                <div className='font-bold flex gap-2 text-2xl italic'>
                                    <div className='mt-1'>
                                        <FaRegCommentDots />
                                    </div>
                                    <div className='text-teal-500'>
                                        Total Comments
                                    </div>
                                </div>
                                <div className='italic text-xl'>
                                    {totalComments}
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className="lowre flex">
                    <div className="user">

                    </div>
                    <div className="comment">

                    </div>
                    <div className="post">

                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashBoard