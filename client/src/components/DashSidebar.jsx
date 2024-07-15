import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOutSuccess } from '../redux/user/userSlice';

const DashSidebar = () => {
    const [tab, setTab] = useState();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const urlParam = new URLSearchParams(location.search);
        const currentTab = urlParam.get('tab');
        if (currentTab) {
            setTab(currentTab);
        }
    })

    const handleSignOut = async (req, res) => {
        try {
            const data = await fetch('http://localhost:3000/api/user/signout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const res = await data.json();
            if (data.ok) {
                toast.success('signout successful ', {
                    position: "top-center"
                })

                dispatch(signOutSuccess());
                navigate('/sign-in');

            }
        } catch (err) {
            console.log('error in sign out : ', err);
        }
    }

    return (
        <Sidebar aria-label="Default sidebar example" className='w-full'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item as='div' active={tab == 'profile'} icon={CgProfile} className='cursor-pointer text-center'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                {
                    currentUser.isAdmin && <>
                        <Sidebar.ItemGroup>
                            <Link to='/dashboard?tab=posts'>
                                <Sidebar.Item as='div' active={tab == 'posts'} icon={CgProfile} className='cursor-pointer text-center'>
                                    Posts
                                </Sidebar.Item>
                            </Link>
                        </Sidebar.ItemGroup>
                    </>
                }
                <Sidebar.ItemGroup>
                    <Sidebar.Item as='div' onClick={handleSignOut} active={tab == 'signout'} icon={GoSignOut} className='cursor-pointer text-center'>
                        Sign-Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    )
}

export default DashSidebar