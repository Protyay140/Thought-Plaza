import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import DashSidebar from '../components/DashSidebar';
import AllPosts from '../components/AllPosts';

const Dashboard = () => {
  const {currentUser} = useSelector(state=> state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [tab,setTab] = useState();
  useEffect(()=>{
    if(!currentUser){
      navigate('/sign-in')
    }    
    const urlParam = new URLSearchParams(location.search);
    const currentTab = urlParam.get('tab');
    if(currentTab){
      setTab(currentTab);
    }
    console.log("tab : ",currentTab);
  })
  return (
    <div className='container flex flex-col md:flex-row'>
        <div className="sidebar md:min-h-screen md:w-56">
          <DashSidebar />
        </div>
        <div className='main-content w-full p-2'>
          {
            tab=='profile' && <Profile />
          }
          {
            tab == 'posts' && <AllPosts />
          }
        </div>
    </div>
  )
}

export default Dashboard