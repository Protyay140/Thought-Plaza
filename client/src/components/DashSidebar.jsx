import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { GoSignOut } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const DashSidebar = () => {
    const [tab, setTab] = useState();
    useEffect(() => {
        const urlParam = new URLSearchParams(location.search);
        const currentTab = urlParam.get('tab');
        if (currentTab) {
            setTab(currentTab);
        }
    })
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
                <Sidebar.ItemGroup>
                    <Sidebar.Item as='div' active={tab == 'signout'} icon={GoSignOut} className='cursor-pointer text-center'>
                        Sign-Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    )
}

export default DashSidebar