import { HR, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostPage = () => {
    const [loading, setLoading] = useState(true);
    const { postId } = useParams();
    const [post, setPost] = useState('');
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

    console.log("params : ", postId);
    console.log('post : ', post);

    if (loading) return (
        <div className='min-h-screen flex justify-center items-center'>
            <Spinner size='xl' />
        </div>
    )
    return (
        <div className='min-h-screen  px-12 pt-3'>
            <div className="container min-h-screen  flex flex-col">
                <div className="title  text-center font-bold text-lg md:text-3xl italic my-2">
                    {post.title && post.title}
                </div>
                <div className='category  text-center font-semibold text-sm italic my-2'>
                    <span className='px-2 bg-[#574f4f] text-white rounded-md '>{post.category && post.category}</span>
                </div>
                {
                    post.image &&
                    <div className="title  text-center my-2">
                        <img src={post.image} alt="post-image" className='h-40 md:h-96 mx-auto rounded-xl' />
                    </div>
                }
                {
                    post.image && 
                    <HR />
                }
                <div className="title  italic my-2 px-1 md:px-52"
                dangerouslySetInnerHTML={{__html : post && post.content}}
                >
                </div>
            </div>
        </div>
    )
}

export default PostPage