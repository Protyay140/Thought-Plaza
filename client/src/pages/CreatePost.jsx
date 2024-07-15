import { FileInput, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { toast } from 'react-toastify';
import Input from 'postcss/lib/input';
const CreatePost = () => {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState();
    const [imageLoading, setImageLoading] = useState(false);
    const [progresspercent, setProgresspercent] = useState(0);
    const [imageFileUrl, setImageFileUrl] = useState();
    const [formData, setFormData] = useState({});
    useEffect(() => {
        if (currentUser.isAdmin == false) {
            navigate('/sign-in');
        }
    })

    const handleUploadImage = async () => {
        try {
            if (!imageFile) {
                return toast.error('please select an image !!!', {
                    position: 'top-center'
                })
            }
            setImageFileUrl(URL.createObjectURL(imageFile));
            setImageLoading(true);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + imageFile.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageFileUrl(downloadURL);
                        setFormData({ ...formData, image: downloadURL })
                        setImageLoading(false);
                    });
                }
            );
        } catch (err) {
            console.log("error in upload image : ", err);
        }
    }


    const handlePublish = async () => {
        try {
            const data = await fetch('http://localhost:3000/api/post/create-post', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    user: currentUser._id
                })
            })

            const res = await data.json();

            if (!data.ok) {
                toast.error('something went wrong on publish !!!', {
                    position: "top-center"
                })
            }else{
                toast.success('post is published successfully', {
                    position: "top-center"
                })
                console.log("resoponse : ",res);
                navigate(`/post/${res.postInfo._id}`);
            }

        } catch (err) {
            console.log('error in publishing the post : ', err);
            toast.error('something went wrong on publish !!!', {
                position: "top-center"
            })
        }
    }

    console.log("formdata : ", formData);
    return (
        <div className=' mx-auto max-w-3xl'>
            <div className="container  flex-col ">
                <div className='text-center font-bold text-3xl italic'>Create Your Post</div>
                <div className="title text-center mt-4 px-12 md:px-56">
                    <form >
                        <TextInput placeholder='Title' onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                        }} />
                    </form>
                </div>
                <div className="catagory text-center mt-4 px-12 md:px-56">
                    <Select className=''
                        onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value });
                        }}
                    >
                        <option value="">choose your category</option>
                        <option value="Food">Food</option>
                        <option value="Technology">Technology</option>
                        <option value="Movie">Movie</option>
                        <option value="Education">Education</option>
                        <option value="Politics">Politics</option>
                        <option value="Others">Others</option>
                    </Select>
                </div>

                <div className='mt-4 p-4 flex justify-between border border-dotted rounded-2xl flex-col md:flex-row '>
                    <div>
                        <FileInput type='file' accept='/image/*' onChange={(e) => {
                            setImageFile(e.target.files[0]);
                        }} />
                    </div>
                    <button onClick={handleUploadImage} className='mt-2 md:mt-0 border p-2 rounded-xl hover:text-white font-bold px-3 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-violet-500'>
                        upload image
                    </button>
                </div>
                {
                    formData.image && <>
                        <div className='mt-2 '>
                            <img src={formData.image} alt="post-image" className='h-96 w-full' />
                        </div>
                    </>
                }
                <div className='mt-4'>
                    <ReactQuill className='h-28 ' theme='snow'
                        onChange={(value) => {
                            setFormData({ ...formData, content: value })
                        }}
                        required />
                </div>
                <div className='text-center mt-20 md:mt-14'>
                    <button disabled={imageLoading} onClick={handlePublish} className={`mb-2 border p-2 rounded-xl hover:text-white font-bold px-3 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-violet-500 ${imageLoading==true ? 'cursor-not-allowed':''}`}>
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost