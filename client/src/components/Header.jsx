import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoIosMoon } from "react-icons/io";
import { useSelector } from 'react-redux';
const Header = () => {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    return (
        <div>
            <Navbar className='border-b-2'>
                <div className='logo border text-sm sm:text-lg dark:text-white'>
                    <Link to={'/'} className='text-white font-semibold rounded-lg py-1 px-2 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500'>Blog-Spot</Link>
                </div>
                <div className='search text-red-700 hidden lg:inline' >
                    <form action="" className=''>
                        <TextInput color="gray" className='focus:outline-none focus:ring-1 focus:ring-gray-500'
                            id='search'
                            name='search'
                            placeholder='search...'
                            rightIcon={CiSearch}

                        />
                    </form>
                </div>
                <div>
                    <Button className=' lg:hidden rounded-full hover:bg-red-400 focus:outline-none focus:ring-1 focus:ring-gray-500' color='gray'>
                        <CiSearch className='text-black' />
                    </Button>
                </div>
                <div className='flex gap-2 md:order-2'>
                    <div className='theme'>
                        <Button className='mt-1 rounded-full bg-white hover:bg-white focus:outline-none focus:ring-1 focus:ring-gray-500' color='gray'>
                            <IoIosMoon className='text-black' />
                        </Button>

                    </div>
                    <div className='signIn'>
                        {
                            currentUser ? <>
                                <Dropdown 
                                    arrowIcon = {false}
                                    inline
                                    label = {
                                        <Avatar 
                                            img={currentUser.profileImage}
                                        />
                                    }
                                >
                                    <Dropdown.Item >{currentUser.email}</Dropdown.Item>
                                    <Dropdown.Item >profile</Dropdown.Item>
                                    <Dropdown.Item >sign-out</Dropdown.Item>
                                </Dropdown>
                            </> :
                                <>
                                    <Link to='/sign-in'>
                                        <Button className='bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-violet-600 focus:outline-none focus:ring-1 focus:ring-gray-500'>
                                            <span className='font-bold text-sm lg:text-lg'> SignIn</span>
                                        </Button>
                                    </Link>
                                </>
                        }

                    </div>
                    <Navbar.Toggle />
                </div>
                {/* <div> */}
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} className={path === '/' ? 'sm:bg-none bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' : ''} as={'div'}>
                        <Link to='/'>Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/about'} className={path === '/about' ? 'sm:bg-none bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' : ''} as={'div'}>
                        <Link to='/about'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/project'} className={path === '/project' ? 'sm:bg-none bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' : ''} as={'div'}>
                        <Link to='/project'>Project</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
                {/* </div> */}
            </Navbar>
        </div>
    )
}

export default Header