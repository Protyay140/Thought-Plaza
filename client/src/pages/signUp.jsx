import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiUser } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from 'react-toastify';

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
      const data = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const res = await data.json();
       console.log('response : ',res);
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

      if(data.ok){
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
    <div className='pt-20 p-2 '>
      <div className='container flex flex-col md:flex-row md:gap-4'>
        <div className='left md:w-1/2 md:mt-16'>
          <div className='logo font-bold text-lg sm:text-lg dark:text-white text-center'>
            <Link to={'/'} className='text-white font-semibold rounded-full py-3 px-3 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500'>Blog-Spot</Link>
          </div>
          <div className="desc text-sm mt-3 text-center">
            <p className='first-letter:text-3xl italic'>Welcome to blogspot, a vibrant space where we explore. Join us on a journey of discovery, insight, and inspiration as we delve into beautiful thoughts.</p>
          </div>
        </div>
        <div className='right mt-10 md:mt-0 md:w-1/3'>
          <form >
            <div className='flex gap-2 mb-2'>
              <CiUser className='mt-1'/>
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
              <MdEmail className='mt-1'/>
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
              <RiLockPasswordFill className='mt-1'/>
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

          <button type='submit' disabled={loading} onClick={handleSubmit} className='mt-5 mb-3 border p-2 rounded-lg font-bold text-center w-full text-white py-3 px-3 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-violet-600 focus:outline-none focus:ring-1 focus:ring-gray-500'>

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

          <p>
            already have an account ? <button className='text-blue-600 hover:text-blue-800'>
              <Link to='/sign-in'> SignIn </Link></button>
          </p>
          <div>
            {errorMessage &&
              <Alert color='red' className='mt-2'>
                {errorMessage}
              </Alert>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp