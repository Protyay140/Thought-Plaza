import { HR, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Comment from '../components/Comment';
import PostCard from '../components/PostCard';

const PostPage = () => {
    const [loading, setLoading] = useState(true);
    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [recentPosts, setRecentPosts] = useState([]);
    useEffect(() => {

        const fetchPost = async () => {
            const res = await fetch(`http://localhost:3000/api/post/getPosts?postId=${postId}`);

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message, {
                    position: 'top-center'
                })
            } else {
                setPost(data.postInfo.posts[0]);
                setLoading(false);
            }
        }

        fetchPost();
    }, [postId]);

    useEffect(() => {

        const fetchRecentPost = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/post/getPosts?limit=3');
                const data = await res.json();
                if (!res.ok) {
                    console.log('error in recent post json : ', data.message);
                } else {
                    setRecentPosts(data.postInfo.posts);
                }
            } catch (err) {
                console.log('error in getting recent posts : ', err);
            }
        }

        fetchRecentPost();
    }, []);

    // console.log("params : ", postId);
    // console.log('post : ', post);

    if (loading) return (
        <div className='min-h-screen flex justify-center items-center'>
            <Spinner size='xl' />
        </div>
    )
    return (
        <div className='min-h-screen  px-12 pt-3 pb-2'>
            <div className="container min-h-screen  flex flex-col">
                <div className="title  text-center font-bold text-lg md:text-3xl italic my-2">
                    {post.title && post.title}
                </div>
                <div className='category  text-center font-semibold text-sm italic my-2'>
                    <span className='px-2 bg-[#574f4f] text-white rounded-full '>{post.category && post.category}</span>
                </div>
                {
                    post.image &&
                    <div className="title  text-center my-2">
                        <img src={post.image} alt="post-image" className='h-40 md:h-96 mx-auto rounded-xl' />
                    </div>
                }
                <div className=' md:px-14 flex justify-end mt-2'>
                    {post.createdAt && <span className='text-[#06b6d4] px-2 rounded-full text-xm'>{new Date(post.createdAt).toLocaleString()}</span>}
                </div>
                {
                    post.image &&
                    <HR />
                }

                <div className="title  italic my-2 px-1 md:px-52"
                    dangerouslySetInnerHTML={{ __html: post && post.content }}
                >
                </div>
                <HR />
                <div className='comment px-1 md:px-52 mt-2 '>
                    <Comment postId={post._id} />
                </div>
                <HR />
                <div className="header text-center italic mb-3 font-bold">
                    Recent Posts
                </div>
                <div className='recent-posts flex flex-col md:flex-row gap-2 justify-between'>
                    {
                        recentPosts.map((recentpost) => {
                            return (
                                <PostCard key={recentpost._id} post={recentpost}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PostPage