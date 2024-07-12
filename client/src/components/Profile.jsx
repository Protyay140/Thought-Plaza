import { Label, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { CiUser } from 'react-icons/ci';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const pickImageFile = useRef();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [progresspercent, setProgresspercent] = useState(0);
    const { currentUser ,error , loading } = useSelector(state => state.user);
    const [imageLoading,setImageLoading] = useState(false);
    const [imageFileUrl, setImageFileUrl] = useState();
    const [imageFile, setImageFile] = useState();
    const handleFile = (e) => {
        console.log('file : ', e.target.files[0]);
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }

    }




    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])

    const uploadImage = async () => {
        try {
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
                        setImageFileUrl(downloadURL)
                        setFormData({
                            ...formData,
                            profileImage: downloadURL
                        })
                        setImageLoading(false);
                    });
                }
            );
        } catch (error) {
            console.log('upload file error : ', error);
        }

    }
    console.log("update : ", formData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const updateHandler = async () => {
        try {
            if (Object.keys(formData).length > 0) {
                dispatch(updateStart());
                console.log("updating ..............");
                const data = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials : 'include',
                    body: JSON.stringify(formData)
                })

                const res = await data.json();
                if (data.ok) {
                    dispatch(updateSuccess(res.userData));
                    toast.success('successfully updated ...',{
                        position : "top-center"
                    })
                } else {
                    dispatch(updateFailure("update failure !!!"));
                }
            }
        } catch (err) {
            dispatch(updateFailure(err));
        }
    }
    return (
        <div className='flex gap-2 mt-3 flex-col '>
            <div className='hidden'> <input type="file" onChange={handleFile} ref={pickImageFile} /></div>
            <div className='profile w-1/2 flex justify-center items-center  mx-auto'>
                <img onClick={() => {
                    pickImageFile.current.click();
                }} src={imageFileUrl || currentUser.profileImage} alt="user" className='rounded-full h-24 cursor-pointer' />
            </div>

            <div className='form w-1/2 mx-auto'>
                <form >
                    <div className='flex gap-2 mb-2'>
                        <CiUser className='mt-1' />
                        <Label value='Username' />
                    </div>
                    <TextInput
                        type='text'
                        id='username'
                        name='username'
                        // value={formData.username}
                        defaultValue={currentUser.username}
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
                        // value={formData.email}
                        defaultValue={currentUser.email}
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
                        // value={formData.password}
                        placeholder='••••••••••••'

                    // onChange={handleChange}
                    />
                </form>
                <div className='container flex justify-between mt-4 mb-3'>
                    <div className='update'>
                        <button disabled={loading || imageLoading} onClick={updateHandler} className={`font-bold p-1 border rounded-full px-4  hover:text-white hover:bg-green-400 ${imageLoading || loading ? 'cursor-not-allowed':''}`}>
                            update
                        </button>
                    </div>
                    <div className="delete">
                        <button className='font-bold p-1 border rounded-full px-4 hover:text-white hover:bg-red-600'>
                            delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile