import React, { useEffect, useState } from 'react'
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
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchParam = urlParams.get('searchTerm');

        if (searchParam) {
            setSearchTerm(searchParam);
        }
    }, [location.search]);
    console.log('searchTerm : ', searchTerm);
    console.log('location : ', location);
    console.log('location.search : ', location.search);
    const handleSignOut = async (req, res) => {
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const data = await fetch(`${baseUrl}/api/user/signout`, {
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);
    }

    return (
        <div>
            <Navbar className=' '>
                <div className='logo text-sm sm:text-lg dark:text-white flex '>
                    <div>
                        <img src="logo.png" alt="logo" className='h-10 -mt-1'/>
                    </div>
                    <div className='mt-1'><Link to={'/'} className='font-semibold'>Thought-Plaza</Link></div>
                </div>
                <div className='search text-red-700 hidden lg:inline' >
                    <form onSubmit={handleFormSubmit} className=''>
                        <TextInput color="gray" className='focus:outline-none focus:ring-1 focus:ring-gray-500'
                            id='search'
                            name='search'
                            placeholder='search...'
                            rightIcon={CiSearch}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <div>
                    <Button onClick={handleFormSubmit} className='dark:bg-white lg:hidden rounded-full hover:bg-red-400 focus:outline-none focus:ring-1 focus:ring-gray-500' color='gray'>
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
                                    <Dropdown.Item >{currentUser.username}</Dropdown.Item>
                                    {
                                        currentUser.isAdmin && <>
                                            <Link to='/dashboard?tab=dashboard'>
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
                    <Navbar.Link active={path === '/dashboard?tab=profile'} className={path === '/post' ? 'sm:bg-none bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' : ''} as={'div'}>
                        <Link to='/dashboard?tab=profile'>Profile</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/contact'} className={path === '/contact' ? 'sm:bg-none bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400' : ''} as={'div'}>
                        <Link to='/contact'>Contact</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
                {/* </div> */}
            </Navbar>
        </div>
    )
}

export default Header