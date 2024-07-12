import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const {currentUser} = useSelector(state=> state.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!currentUser){
      navigate('/sign-in')
    }    
  })
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard