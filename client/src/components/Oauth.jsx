import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
const Oauth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() => {
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({prompt:'select_account'})
           
            try {
                const result = await signInWithPopup(auth,provider);
                console.log("auth : ",result.user);
                const res = await fetch('http://localhost:3000/api/auth/google',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        email : result.user.email,
                        photoURL : result.user.photoURL,
                        name : result.user.displayName
                    })
                })
                const data = await res.json();
                if(res.ok){
                    dispatch(signInSuccess(data.userData));
                    navigate('/');
                }
            } catch (error) {
                console.log('error in google auth: ',error);
            }
    }

    return (
        <div className=''>
            <button onClick={handleGoogleClick} className=' mt-2 mb-3 border rounded-lg  text-center w-full py-2 px-3 border-violet-500 hover:bg-violet-100'>
                <div className='flex gap-3 justify-center'>
                    <div className='mt-1'>
                        <FcGoogle />
                    </div>
                    <div>Continue with Google</div>
                </div>
            </button>
        </div>
    )
}

export default Oauth