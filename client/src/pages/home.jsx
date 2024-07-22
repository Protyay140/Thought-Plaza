import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
    console.log('currentUser : ', currentUser);
  })
  const backgroundImageStyle = {
    backgroundImage: 'url(https://miro.medium.com/v2/resize:fit:2200/1*b9gId0TV1TyFacmHroNg0Q.gif)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '90vh', // or any desired height
    width: '100%', // or any desired width
  };
  return (
    <>
      <div className=''>welcome to home mr. {currentUser?.username}</div>
      {/* <div style={backgroundImageStyle}>
        sdkfjkf
      </div> */}
    </>
  )
}

export default Home