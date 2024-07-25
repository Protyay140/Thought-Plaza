import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const AllComments = ({ comment , onDelete}) => {
    const [user, setUser] = useState();
    const {currentUser} = useSelector(state=> state.user);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL;
                const res = await fetch(`${baseUrl}/api/user/getUser/${comment.userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log('error in getting comment user api call : ', data.message);
                } else {
                    setUser(data.userInfo);
                }
            } catch (err) {
                console.log('error in getting comment user : ', err);
            }
        }
        fetchUser();

    }, [comment]);

    // console.log("comment user : ", user);

    return (
        <div className='flex flex-col mt-2 '>
            <div className='user-info flex gap-2'>
                <div className="pic">
                    {user &&
                        <img src={user.profileImage} alt="user-pic" className='h-6 rounded-full' />
                    }
                </div>
                <div className="username text-sm text-[#06b6d4] font-bold">
                    {user &&
                        <p>@{user.username}</p>
                    }

                </div>
                <div className="time text-sm">
                    {user &&
                        <span className='text-gray-400'>{moment(comment.createdAt).fromNow()}</span>
                    }
                </div>
            </div>
            <div className='user-comment ml-[2rem] text-sm'>
                {comment.comment}
            </div>
            <div className=''>
                {
                    currentUser && (currentUser._id == comment.userId) && 
                    <>
                        <button onClick={()=> onDelete(comment._id)} className='text-xs ml-[2rem] bg-gray-500 px-1 rounded-md hover:bg-gray-600 text-white'>delete</button>
                    </>
                }
            </div>
        </div>
    )
}

export default AllComments