import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import Oauth from '../components/Oauth';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value
    }
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    //  alert('hi')
    //  console.log("formdata : ",formData);
    try {

      if (!formData.username || !formData.email || !formData.password) {

        return seterrorMessage("all fields are required ...")
      }


      seterrorMessage(null);
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const data = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const res = await data.json();
      console.log('response : ', res);
      setLoading(false);
      if (res.success === false) {
        console.log("failed response :", res.message)

        return seterrorMessage(res.message);
      }
      setformData({
        username: "",
        email: "",
        password: ""
      });

      if (data.ok) {
        navigate('/sign-in');
      }
      toast.success("registration successful ...", {
        position: "top-center"
      })



      // console.log('response : ', res);

    } catch (err) {
      console.log('error in submiting signup form : ', err);
      setLoading(false);
      seterrorMessage(err);
    }
  }

  return (
    <div className='p-1 pb-5 overflow-x-hidden'>
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{ scale: 0.9 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120, ease: 'easeInOut' }}
        className='container flex flex-col min-w-full items-center md:gap-4'>
        <div className='left md:w-1/2 md:mt-5'>
          <div className='logo text-sm sm:text-lg dark:text-white flex  justify-center'>
            <div>
              <img src="logo.png" alt="logo" className='h-10 -mt-1' />
            </div>
            <div><Link to={'/'} className='font-semibold rounded-lg py-1 px-2 '>Thought-Plaza</Link></div>
          </div>
          {/* <div className="desc text-sm mt-3 text-center">
            <p className='first-letter:text-3xl italic'>Welcome to Thought-Plaza, a vibrant space where we explore. Join us on a journey of discovery, insight, and inspiration as we delve into beautiful thoughts.</p>
          </div> */}
        </div>
        <div className='right mt-10 md:mt-0 md:w-1/3'>
          <form >
            <div className='flex gap-2 mb-2'>
              <CiUser className='mt-1' />
              <Label value='Username' />
            </div>
            <TextInput
              type='text'
              id='username'
              name='username'
              value={formData.username}
              placeholder='pro140'

              onChange={handleChange}
            />
            <div className='flex gap-2 mt-2 mb-2'>
              <MdEmail className='mt-1' />
              <Label value='Email' />
            </div>
            <TextInput
              type='email'
              id='email'
              name='email'
              value={formData.email}
              placeholder='pro@gmail.com'

              onChange={handleChange}
            />
            <div className='flex gap-2 mt-2 mb-2'>
              <RiLockPasswordFill className='mt-1' />
              <Label value='Password' />
            </div>
            <TextInput
              type='password'
              id='password'
              name='password'
              value={formData.password}
              placeholder='••••••••••••'

              onChange={handleChange}
            />
          </form>
          {/* <div className='text-center mb-2'>
            <button className='p-2 bg-green-500 mt-3 rounded-3xl text-white px-4 hover:bg-green-700'>
              Signup
            </button>
          </div> */}

          <button type='submit' disabled={loading} onClick={handleSubmit} className='mt-5 mb-3 border rounded-lg font-bold text-center w-full text-white py-2 px-3 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-violet-600 focus:outline-none focus:ring-1 focus:ring-gray-500'>

            {
              loading === true ? (
                <>
                  <Spinner />
                  <span className='ml-2'>Loading...</span>
                </>
              ) :
                (
                  'Signup'
                )
            }

          </button>
          <Oauth />
          <p>
            already have an account ? <button className='text-blue-600 hover:text-blue-800'>
              <Link className='underline dark:hover:text-blue-500 dark:text-blue-400' to='/sign-in'> SignIn </Link></button>
          </p>

          <div>
            {errorMessage &&
              <Alert color='red' className='mt-2'>
                {errorMessage}
              </Alert>
            }

          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUp