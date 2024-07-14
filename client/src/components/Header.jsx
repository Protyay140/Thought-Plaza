import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoIosMoon } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { toast } from 'react-toastify';
import { signOutSuccess } from '../redux/user/userSlice';
const Header = () => {
    const path = useLocation().pathname;
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    console.log('theme : ', theme);
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
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
        <div>
            <Navbar className='border-b-2 '>
                <div className='logo text-sm sm:text-lg dark:text-white'>
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
                    <Button className='dark:bg-white lg:hidden rounded-full hover:bg-red-400 focus:outline-none focus:ring-1 focus:ring-gray-500' color='gray'>
                        <CiSearch className='text-black' />
                    </Button>
                </div>
                <div className='flex gap-2 md:order-2'>
                    <div className='theme'>
                        <Button onClick={() => {
                            dispatch(toggleTheme());
                        }} className='mt-1 rounded-full dark:bg-white dark:hover:bg-gray-100 bg-white focus:outline-none focus:ring-1 focus:ring-gray-500' color='gray'>
                            {
                                theme == 'dark' ? <>
                                    <FaRegLightbulb className='text-black ' />
                                </> : <>
                                    <IoIosMoon className='text-black ' />
                                </>
                            }

                        </Button>

                    </div>
                    <div className='signIn'>
                        {
                            currentUser ? <>
                                <Dropdown
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <Avatar
                                            img={currentUser.profileImage}
                                            rounded
                                        />
                                    }
                                >
                                    <Dropdown.Item >{currentUser.email}</Dropdown.Item>
                                    {
                                        currentUser.isAdmin && <>
                                            <Link to='/dashboard?tab=profile'>
                                                <Dropdown.Item >
                                                    dashboard
                                                </Dropdown.Item>
                                            </Link>
                                        </>
                                    }
                                    <Link to='/dashboard?tab=profile'>
                                        <Dropdown.Item >
                                            profile
                                        </Dropdown.Item>
                                    </Link>

                                    <Dropdown.Item onClick={handleSignOut}>sign-out</Dropdown.Item>
                                </Dropdown>
                            </> :
                                <>
                                    <Link to='/sign-in'>
                                        <button className='p-2 text-white rounded-full px-3 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-violet-600 focus:outline-none focus:ring-1 focus:ring-gray-500'>
                                            <span className='font-semibold text-sm lg:text-lg'> SignIn</span>
                                        </button>
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