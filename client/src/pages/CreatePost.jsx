import { Select, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser.isAdmin == false) {
            navigate('/sign-in');
        }
    })

    return (
        <div className=' mx-auto max-w-3xl'>
            <div className="container  flex-col ">
                <div className='text-center font-bold text-3xl italic'>Create Your Post</div>
                <div className="title text-center mt-4 px-12 md:px-56">
                    <form >
                        <TextInput placeholder='Title' />
                    </form>
                </div>
                <div className="catagory text-center mt-4 px-12 md:px-56">
                    <Select className=''>
                        <option value="javascript">choose your category</option>
                        <option value="javascript">javascript</option>
                        <option value="javascript">react</option>
                        <option value="javascript">nextjs</option>
                    </Select>
                </div>

                <div className='mt-4 p-4 flex justify-between border border-dotted rounded-2xl flex-col md:flex-row '>
                    <div>
                        <TextInput type='file' accept='image/*' />
                    </div>
                    <button className='mt-2 md:mt-0 border p-2 rounded-xl hover:text-white font-bold px-3 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-violet-500'>
                        upload image
                    </button>
                </div>
                <div className='mt-4'>
                    <ReactQuill className='h-28 ' theme='snow' />
                </div>
                <div className='text-center mt-20 md:mt-14'>
                    <button className='mb-2 border p-2 rounded-xl hover:text-white font-bold px-3 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-violet-500'>
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost