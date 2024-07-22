import { Carousel, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdCompost } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [recentPosts, setRecentPosts] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentComments, setRecentComments] = useState([]);

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

        const fetchRecentUsers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/user/getUsers?limit=5&userId=${currentUser._id}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log('error in recent user api : ', data.message);
                } else {
                    setRecentUsers(data.postInfo.users);
                    setLoading(false);
                }
            } catch (err) {
                console.log('error in getting recent users : ', err);
            }
        }

        const fetchRecentPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/post/getPosts?limit=5`);
                const data = await res.json();
                if (!res.ok) {
                    console.log('error in recent post api : ', data.message);
                } else {
                    setRecentPosts(data.postInfo.posts);
                    setLoading(false);
                }
            } catch (err) {
                console.log('error in getting recent posts : ', err);
            }
        }

        const fetchRecentComments = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/comment/getRecentComments?limit=5&userId=${currentUser._id}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log('error in recent comment api : ', data.message);
                } else {
                    setRecentComments(data.commentInfo);
                    setLoading(false);
                }
            } catch (err) {
                console.log('error in getting recent comments : ', err);
            }
        }

        fetchTotalUsers();
        fetchTotalPosts();
        fetchTotalComments();
        fetchRecentPosts();
        fetchRecentUsers();
        fetchRecentComments();
    }, [currentUser]);

    console.log('recent Users : ', recentUsers);
    console.log('recent Posts : ', recentPosts);
    console.log('recent comments : ', recentComments);

    if (loading) return (
        <>
            <div className='flex justify-center min-h-screen items-center'>
                <Spinner size='xl' />
            </div>
        </>
    )
    return (
        <>
            <div className="container ">
                <div className="upper flex justify-center pt-3">
                    <div className="h-40 w-1/2 md:w-1/3">
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
                <div className="lowre flex flex-col md:flex-row justify-center  mt-3 gap-2">
                    <div className="recent-user flex flex-col mx-3 ">
                        <div className=' flex justify-center p-2 font-bold italic'>
                            <span>Recent Users</span>
                        </div>
                        <div>
                            <Table hoverable>
                                <Table.Head>

                                    <Table.HeadCell>Username</Table.HeadCell>
                                    <Table.HeadCell>User Image</Table.HeadCell>

                                </Table.Head>

                                <Table.Body className="divide-y">
                                    {
                                        recentUsers.map((user) => {
                                            return (

                                                <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                                                    <Table.Cell>{user.username}</Table.Cell>
                                                </Table.Row>

                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </div>

                    </div>
                    <div className="recent-post flex flex-col mx-3 ">
                        <div className=' flex justify-center p-2 font-bold italic'>
                            <span>Recent Posts</span>
                        </div>
                        <div>
                            <Table hoverable>
                                <Table.Head>

                                    <Table.HeadCell>post Image</Table.HeadCell>
                                    <Table.HeadCell>post Title</Table.HeadCell>
                                    <Table.HeadCell>post Date</Table.HeadCell>
                                </Table.Head>

                                <Table.Body className="divide-y">
                                    {
                                        recentPosts.map((post) => {
                                            return (

                                                <Table.Row key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Link to={`/post/${post._id}`}>
                                                        <Table.Cell>
                                                            {
                                                                post.image ? <>
                                                                    <img src={post.image} alt="postImage" className='h-12 ' />
                                                                </> :
                                                                    <>
                                                                        <p className=''>---</p>
                                                                    </>
                                                            }

                                                        </Table.Cell>
                                                    </Link>
                                                    <Table.Cell>{post.title}</Table.Cell>
                                                    <Table.Cell>{new Date(post.createdAt).toLocaleString()}</Table.Cell>
                                                </Table.Row>

                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                    <div className="recent-comments flex flex-col mx-3 ">
                        <div className=' flex justify-center p-2 font-bold italic'>
                            <span>Recent Comments</span>
                        </div>
                        <div>
                            <Table hoverable>
                                <Table.Head>

                                    <Table.HeadCell>Comments</Table.HeadCell>

                                </Table.Head>

                                <Table.Body className="divide-y">
                                    {
                                        recentComments.map((comment) => {
                                            return (

                                                <Table.Row key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Link to={`/post/${comment.postId}`}>
                                                        <Table.Cell>{comment.comment}</Table.Cell>
                                                    </Link>
                                                </Table.Row>

                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashBoard