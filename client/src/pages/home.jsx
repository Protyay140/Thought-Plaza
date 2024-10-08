import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { delay, motion } from 'framer-motion'
import Typewriter from 'typewriter-effect';
import { HR, Spinner } from 'flowbite-react';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';
import transition from '../transition';

const Home = () => {
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
    console.log('currentUser : ', currentUser);
  })

  const [recentPostsLoading, setRecentPostsLoading] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        setRecentPostsLoading(true);
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const res = await fetch(`${baseUrl}/api/post/getPosts?limit=3`);
        const data = await res.json();
        if (!res.ok) {
          setRecentPostsLoading(false);
          console.log('error in recent post json : ', data.message);
        } else {
          setRecentPostsLoading(false);
          setRecentPosts(data.postInfo.posts);
        }
      } catch (err) {
        console.log('error in getting recent posts : ', err);
      }
    }

    fetchRecentPost();
  }, [])

  const glowVariants = {
    glow: {
      textShadow: [
        "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00ff",
        "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00ff"
      ],
      transition: {
        // duration: 0.3,
        // repeat: Infinity,
      }
    }
  };

  return (
    <>
      <div className='main-container min-h-screen flex flex-col  gap-2 p-2 overflow-x-hidden'>
        <div className='hero  flex flex-col-reverse md:flex-row gap-2 pl-3 overflow-x-hidden'>
          <motion.div

            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}

            className="left  md:w-1/2 flex flex-col gap-2">
            <div className="top text-center mt-3">
              <span className='text-2xl font-bold'>Share Your Thoughts, Engage with the World</span>
            </div>
            <div className="middle text-2xl text-teal-400 text-center mt-4">
              {/* <span className='text-md font-bold'>Join our community to create, share, and discuss posts with people from all around the globe.</span> */}
              <Typewriter
                options={{
                  strings: ['Engage in meaningful conversations', 'Share your stories with a global audience', 'Create posts that inspire and inform'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <div className="lower mt-4 ">
              <span>Welcome to Thought-Plaza, the place where your ideas take center stage. Create posts on topics that matter to you, share them with a vibrant community, and spark meaningful conversations. Whether you’re sharing your latest insights, telling a story, or commenting on others' posts, your voice matters here. With your personalized dashboard, you can easily keep track of your posts and see what others are saying about them. Dive in and start connecting!</span>
            </div>
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => {
                  navigate('/search?searchTerm=')
                }}
                className='bg-teal-400 p-2 px-5 text-white rounded-lg mt-5 hover:bg-teal-500'>explore posts</motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="right  md:w-1/2">
            <img src="home_pic.png" alt="hero_image" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="key-point flex flex-col md:flex-row gap-2 mt-6">
          <div className='md:w-1/3  flex flex-col text-center gap-2'>
            <div className='  w-1/2 mx-auto'>
              <img src="create_post.png" alt="" />
            </div>
            <div className=' text-center font-bold'>
              <motion.span
                variants={glowVariants}
                animate="glow"
                className='font-bold'> Create-Your Own post</motion.span>
            </div>
          </div>
          <div className='md:w-1/3  flex flex-col text-center gap-2'>
            <div className=' w-3/4 mx-auto'>
              <img src="explore_post.png" alt="" />
            </div>
            <div className=' font-bold'>
              <motion.span
                variants={glowVariants}
                animate="glow"
                className='font-bold'>Explore posts</motion.span>
            </div>
          </div>
          <div className='md:w-1/3  flex flex-col text-center gap-2'>
            <div className=' w-3/4 mx-auto'>
              <img src="dashboard.png" alt="" />
            </div>
            <div className=' font-bold'>
              <motion.span
                variants={glowVariants}
                animate="glow"
                className='font-bold'>Analyze your dashboard</motion.span>
            </div>
          </div>
        </motion.div>
        <div className="features flex flex-col  text-center mt-20 md:px-48 ">
          <div className='upper flex flex-col'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className=''>
              <span className='text-3xl'>Features</span>
            </motion.div>
            <div className=''>
              <span className='text-xs'>Discover What You Can Do</span>
            </div>
          </div>
          <div className='lower  flex flex-col gap-2'>
            <div className='sign-in flex flex-col md:flex-row '>
              <motion.div

                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='image md:w-1/2  text-center'>
                <img src="signin.png" alt="signin" className='md:w-96  mx-auto' />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='desc md:w-1/2   '>
                <p className='first-letter:text-3xl mt-7 text-sm'>
                  Begin your journey by signing into our platform. With a quick and secure sign-in process, you can access your personalized dashboard, stay updated with the latest posts, and engage with the community. Signing in ensures that all your contributions are saved and easily accessible, making your experience seamless and enjoyable
                </p>
              </motion.div>
            </div>
            <div className='post flex flex-col-reverse md:flex-row '>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='desc md:w-1/2   '>
                <p className='first-letter:text-3xl mt-7 text-sm'>
                  Unleash your creativity by creating posts on topics that matter to you. Our intuitive editor allows you to craft detailed and engaging posts with ease. Share your thoughts, stories, and insights with a global audience. Whether you’re writing a brief update or a comprehensive article, your voice will find its place in our vibrant community.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='image md:w-1/2  text-center'>
                <img src="post.png" alt="signin" className='md:w-56  mx-auto' />
              </motion.div>
            </div>
            <div className='sign-in flex flex-col md:flex-row '>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='image md:w-1/2  text-center'>
                <img src="profile.png" alt="signin" className='md:w-96  mx-auto' />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className='desc md:w-1/2  items-center '>
                <p className='first-letter:text-2xl mt-7 text-sm '>
                  Stay on top of your interactions with our powerful dashboard. View all your posts, comments, and engagements in one centralized place. Analyze the performance of your content, track audience feedback, and respond to comments. Our dashboard provides you with the insights you need to grow your influence and connect more deeply with your audience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <HR />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="post  flex flex-col gap-2 mb-5">
          <div className='text-center font-bold'>
            <span>Recent Posts</span>
          </div>
          {
            !recentPostsLoading &&
            <>
              {/* <div className="header text-center italic mb-3 font-bold">
                Recent Posts
              </div> */}
              <div className='recent-posts flex flex-col md:flex-row gap-2 flex-wrap justify-center px-7'>
                {
                  recentPosts.map((recentpost) => {
                    return (
                      <PostCard key={recentpost._id} post={recentpost} />
                    )
                  })
                }
              </div>
            </>
          }
          {
            recentPostsLoading &&
            <>
              <div className='w-full justify-center flex'>
                <Spinner size='xl' />
              </div>
            </>
          }
        </motion.div>
      </div>
    </>
  )
}

export default Home;