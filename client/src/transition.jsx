import React from 'react'
import { delay, motion } from 'framer-motion'

const transition = (component) => {
  return (
    <>
        <component />
        <motion.div 
            className='slideIn w-[100%] h-[100vh] bg-black fixed top-0 left-0 origin-bottom'
            initial = {{scaleY : 0}}
            animate = {{scaleY : 0}}
            exit = {{scaleY : 1}}
            transition={{duration:1,ease : [0.22,1,0.36,1]}}
        />
        <motion.div 
            className='slideOut w-[100%] h-[100vh] bg-black fixed top-0 left-0 origin-top'
            initial = {{scaleY : 1}}
            animate = {{scaleY : 0}}
            exit = {{scaleY : 0}}
            transition={{duration:1,ease : [0.22,1,0.36,1]}}      
        />
    </>
  )
}

export default transition