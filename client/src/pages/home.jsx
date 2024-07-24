import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { delay, motion } from 'framer-motion'
import Typewriter from 'typewriter-effect';
import { HR, Spinner } from 'flowbite-react';
import PostCard from '../components/PostCard';
const Home = () => {
  const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
    console.log('currentUser : ', currentUser);
  })

  const [recentPostsLoading, setRecentPostsLoading] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        setRecentPostsLoading(true);
        const res = await fetch('http://localhost:3000/api/post/getPosts?limit=3');
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

  return (
    <>
      <div className='main-container min-h-screen flex flex-col  gap-2 p-2'>
        <div className='hero  flex flex-col-reverse md:flex-row gap-2 pl-3'>
          <div className="left  md:w-1/2 flex flex-col gap-2">
            <div className="top text-center mt-3">
              <span className='text-3xl font-bold'>Share Your Thoughts, Engage with the World</span>
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
              <button className='bg-teal-400 p-2 px-5 text-white rounded-lg mt-5'>explore posts</button>
            </div>
          </div>
          <div className="right  md:w-1/2">
            <img src="home_pic.png" alt="hero_image" />
          </div>
        </div>
        <div className="key-points flex flex-col md:flex-row gap-2 mt-6">
          <div className='md:w-1/3  flex flex-col text-center gap-2'>
            <div className='  w-1/2 mx-auto'>
              <img src="create_post.png" alt="" />
            </div>
            <div classsName=' text-center font-bold'>
              <span className='font-bold'> Create-Your Own post</span>
            </div>
          </div>
          <div className='md:w-1/3  flex flex-col text-center gap-2'>
            <div className=' w-3/4 mx-auto'>
              <img src="explore_post.png" alt="" />
            </div>
            <div classsName=' font-bold'>
              <span className='font-bold'>Explore posts</span>
            </div>
          </div>
          <div className='md:w-1/3  flex flex-col text-center gap-2'>
            <div className=' w-3/4 mx-auto'>
              <img src="dashboard.png" alt="" />
            </div>
            <div classsName=' font-bold'>
              <span className='font-bold'>Analyze your dashboard</span>
            </div>
          </div>
        </div>
        <div className="features flex flex-col  text-center mt-20 md:px-48 ">
          <div className='upper flex flex-col'>
            <div className=''>
              <span className='text-3xl'>Features</span>
            </div>
            <div className=''>
              <span className='text-xs'>Discover What You Can Do</span>
            </div>
          </div>
          <div className='lower  flex flex-col gap-2'>
            <div className='sign-in flex flex-col md:flex-row '>
              <div className='image md:w-1/2  text-center'>
                <img src="signin.png" alt="signin" className='md:w-96  mx-auto' />
              </div>
              <div className='desc md:w-1/2   '>
                <p className='first-letter:text-3xl mt-7 text-sm'>
                  Begin your journey by signing into our platform. With a quick and secure sign-in process, you can access your personalized dashboard, stay updated with the latest posts, and engage with the community. Signing in ensures that all your contributions are saved and easily accessible, making your experience seamless and enjoyable
                </p>
              </div>
            </div>
            <div className='post flex flex-col-reverse md:flex-row '>
              <div className='desc md:w-1/2   '>
                <p className='first-letter:text-3xl mt-7 text-sm'>
                  Unleash your creativity by creating posts on topics that matter to you. Our intuitive editor allows you to craft detailed and engaging posts with ease. Share your thoughts, stories, and insights with a global audience. Whether you’re writing a brief update or a comprehensive article, your voice will find its place in our vibrant community.
                </p>
              </div>
              <div className='image md:w-1/2  text-center'>
                <img src="post.png" alt="signin" className='md:w-56  mx-auto' />
              </div>
            </div>
            <div className='sign-in flex flex-col md:flex-row '>
              <div className='image md:w-1/2  text-center'>
                <img src="profile.png" alt="signin" className='md:w-96  mx-auto' />
              </div>
              <div className='desc md:w-1/2  items-center '>
                <p className='first-letter:text-2xl mt-7 text-sm '>
                  Stay on top of your interactions with our powerful dashboard. View all your posts, comments, and engagements in one centralized place. Analyze the performance of your content, track audience feedback, and respond to comments. Our dashboard provides you with the insights you need to grow your influence and connect more deeply with your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
        <HR />
        <div className="post  flex flex-col gap-2 mb-5">
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
        </div>
      </div>
    </>
  )
}

export default Home