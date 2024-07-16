import moment from 'moment'
import React, { useEffect, useState } from 'react'

const AllComments = ({ comment }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user/getUser/${comment.userId}`, {
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

    console.log("comment user : ", user);

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
            <div>

            </div>
        </div>
    )
}

export default AllComments