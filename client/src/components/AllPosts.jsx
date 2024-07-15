import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AllPosts = () => {
  const { currentUser } = useSelector(state => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [showMore,setShowMore] = useState(true);
  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const data = await fetch(`http://localhost:3000/api/post/getPosts?userId=${currentUser._id}&limit=5`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const res = await data.json();

        if (!data.ok) {
          console.log('error in post json');
        } else {
          setUserPosts(res.postInfo.posts);
          console.log('fetch posts length : ',res.postInfo.posts.length);
          if(res.postInfo.posts.length < 5){
            setShowMore(false);
          }
        }
        setLoadingPost(false);
      } catch (err) {
        console.log('error in getting the posts : ', err);
      }

    }

    // if (currentUser.isAdmin) {
    fetchUserPost();
    // }
  }, [currentUser._id]);


  const handleShowMore = async()=>{
    try {
      const startFrom = userPosts.length;
      const data = await fetch(`http://localhost:3000/api/post/getPosts?userId=${currentUser._id}&startFrom=${startFrom}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const res = await data.json();

      if (!data.ok) {
        console.log('error in post json');
      } else {
        setUserPosts((prev)=>[...prev,...res.postInfo.posts]);
        console.log('fetch posts length : ',res.postInfo.posts.length);
        if(res.postInfo.posts.length < 5){
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log('error in show more functionality : ',err);
    }
  }

  console.log('user posts : ', userPosts);

  return (
    <>
      {
        loadingPost == false ? <>
          <div className='overflow-x-auto'>
            {
              userPosts.length > 0 ? <>
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>Post Title</Table.HeadCell>
                    <Table.HeadCell>Post Category</Table.HeadCell>
                    <Table.HeadCell>Post Image</Table.HeadCell>
                    <Table.HeadCell>Date of Post</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">delete</span>
                    </Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y">
                    {
                      userPosts.map((post) => {
                        return (

                          <Table.Row key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {'Apple MacBook Pro 17"'}
                        </Table.Cell> */}
                            <Table.Cell>{post.title}</Table.Cell>
                            <Table.Cell>{post.category}</Table.Cell>
                            <Table.Cell>
                              {
                                post.image ? <>
                                  <img src={post.image} alt="postImage" className='h-12' />
                                </> :
                                  <>
                                    <p className=''>---</p>
                                  </>
                              }

                            </Table.Cell>
                            <Table.Cell>{new Date(post.updatedAt).toLocaleString()}</Table.Cell>
                            <Table.Cell>
                              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                delete
                              </a>
                            </Table.Cell>
                          </Table.Row>

                        )
                      })
                    }
                  </Table.Body>
                </Table>
                {
                  showMore && <>
                    <p className='text-center mt-3 font-bold text-green-400'>
                      <button onClick={handleShowMore}>. . . . Show More . . . .</button>
                    </p>
                  </>
                }
              </> :
                <>
                  <p className='text-center mt-3 font-bold text-2xl italic'>You haven't publish any post yet !!!</p>
                </>
            }
          </div>
        </> :
          <>
            <p className='text-center'>Loading .....</p>
          </>
      }

    </>

  )
}

export default AllPosts