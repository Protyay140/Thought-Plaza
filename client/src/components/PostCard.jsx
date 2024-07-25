import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user/getUser/${post.user}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data.userInfo);
                }
            } catch (err) {
                console.log('error in getting recent post user : ', err);
            }

        }
        fetchUser();
    }, []);
    console.log('recent post user : ', user);
    return (
        <div className='border flex flex-col  group relative overflow-hidden h-[300px] md:h-[295px] sm:w-[370px] rounded-lg'>
            <Link to={`/post/${post._id}`}>
                <img src={post.image} alt="postImage" className='h-[200px] w-full
            object-cover group-hover:h-[150px] transition-all duration-200
            z-20
            '/>
            </Link>
            <div className="title flex flex-col gap-1">
                <p className='italic ml-2'>title : {post.title}</p>
                <p className='italic ml-2 text-sm'>category : {post.category}</p>
                <div className="flex gap-10">
                    <div className="owner">
                        {
                            user &&
                            <p className='italic ml-2 text-sm'>
                                owner : <span className='font-bold'>@{user.username}</span>
                            </p>
                        }
                    </div>
                    <div className="date">
                        <p className='text-sm italic '>date : {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <Link to={`/post/${post._id}`} className='absolute group-hover:bottom-0 border left-0 right-0 
                px-1 bottom-[-200px] m-1 text-center border-teal-500 rounded-xl
                hover:text-white hover:bg-teal-600 transition-all duration-200
                '>
                    Read Post
                </Link>
            </div>
        </div>
    )
}

export default PostCard