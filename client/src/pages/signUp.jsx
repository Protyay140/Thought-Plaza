import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const SignUp = () => {
  return (
    <div className='pt-20 p-2 '>
      <div className='container flex flex-col md:flex-row md:gap-4'>
        <div className='left md:w-1/2 md:mt-16'>
          <div className='logo font-bold text-lg sm:text-lg dark:text-white text-center'>
            <Link to={'/'} className='text-white font-semibold rounded-full py-3 px-3 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400'>Blog-Spot</Link>
          </div>
          <div className="desc text-sm mt-3 text-center">
            <p className='first-letter:text-3xl italic'>Welcome to blogspot, a vibrant space where we explore. Join us on a journey of discovery, insight, and inspiration as we delve into beautiful thoughts.</p>
          </div>
        </div>
        <div className='right mt-10 md:mt-0 md:w-1/3'>
          <form>
            <div className='flex gap-2'>
              <CiUser />
              <Label value='Username' />
            </div>
            <TextInput
              type='text'
              id='username'
              name='username'
              placeholder='username'
            />
            <div className='flex gap-2 mt-2'>
              <MdEmail />
              <Label value='Email' />
            </div>
            <TextInput
              type='email'
              id='email'
              name='email'
              placeholder='email'
            />
            <div className='flex gap-2 mt-2'>
              <RiLockPasswordFill />
              <Label value='Password' />
            </div>
            <TextInput
              type='password'
              id='password'
              name='password'
              placeholder='password'
            />
          </form>
          <div className='text-center mb-2 '>
            <button className='p-2 bg-green-500 mt-3 rounded-3xl text-white px-4 hover:bg-green-700'>
              Signup
            </button>
          </div>

          <p>
            already have an account ? <button className='text-blue-600 hover:text-blue-800'>
              <Link to='/sign-in'> SignIn </Link></button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp