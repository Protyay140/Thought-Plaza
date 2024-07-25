import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { MdEmail } from "react-icons/md";
import { MdOutlineSubject } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
const Contact = () => {
  const { currentUser } = useSelector(state => state.user);
  const [contactData, setContactData] = useState({
    email: currentUser?.email || '',
    subject: '',
    message: '',
  })

  const handleContactForm = async () => {
    try {
      console.log('contact Data : ',contactData);
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const res = await fetch(`${baseUrl}/api/contact/sendMail`, {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      })
      const data = await res.json();
      console.log('response : ',res);
      if (!res.ok) {
        console.log('error in contact form api : ', data.message);
      } else {
        toast.success('message send successfully', { position: 'top-center' });
        setContactData({
          email: currentUser.email,
          subject: '',
          message: '',
        })
      }
    } catch (err) {
      console.log('error in contact form : ', err);
    }
  }

  return (
    <>
      <div className="container flex justify-center min-h-screen items-center text-center">
        <motion.div 
        initial = {{scale:0.2}}
        animate = {{scale:0.9}}
        transition={{duration : 0.5 ,type : 'spring' , stiffness : 120 , ease : 'easeInOut'}}
        className="form flex flex-col gap-2 md:w-1/2 mx-auto">
          <div className="header text-center font-bold italic mb-2">
            <span className='text-teal-400 text-md md:text-lg'>Send a Message to The Creator 👇🏻</span>
          </div>
          <form className='flex flex-col gap-2 italic'>
            <div className="email flex flex-col gap-1">
              <div className="label flex gap-2">
                <div className='mt-1'><MdEmail /></div>
                <label htmlFor="email">Your Email : </label>
              </div>

              <input type="text" id='email' className='h-8 text-gray-500 p-3 rounded-lg'
                value={contactData.email}
                onChange={(e) => {
                  setContactData({ ...contactData, email: e.target.value });
                }}
              />
            </div>
            <div className="subject flex flex-col gap-1">
              <div className="label flex gap-2">
                <div className='mt-1'><MdOutlineSubject /></div>
                <label htmlFor="subject">Subject : </label>
              </div>
              <input type="text" id='subject' className='h-8 text-gray-500 p-3 rounded-lg'
                value={contactData.subject}
                onChange={(e) => {
                  setContactData({ ...contactData, subject: e.target.value });
                }}
              />
            </div>
            <div className="message flex flex-col gap-1">
              <div className="label flex gap-2">
                <div className='mt-1'><TiMessages /></div>
                <label htmlFor="message">Message : </label>
              </div>
              <textarea id='message' rows={3} className='text-gray-500 text-sm p-3 rounded-lg'
                value={contactData.message}
                onChange={(e) => {
                  setContactData({ ...contactData, message: e.target.value });
                }}
              />
            </div>
          </form>
          <div className="submit text-center">
            <button onClick={handleContactForm} className='border p-1 rounded-lg px-5 mt-2 bg-teal-500 text-white hover:bg-teal-600'>send message</button>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Contact