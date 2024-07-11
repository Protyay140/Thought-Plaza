import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {currentUser} = useSelector(state=> state.user);
  useEffect(()=>{
    console.log('currentUser : ',currentUser);
  })
  return (
    <div>welcome to home mr. {currentUser.username}</div>
  )
}

export default Home