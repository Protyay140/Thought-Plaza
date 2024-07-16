import { Button, Modal, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllPosts = () => {
  const { currentUser } = useSelector(state => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
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
          console.log('fetch posts length : ', res.postInfo.posts.length);
          if (res.postInfo.posts.length < 5) {
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


  const handleShowMore = async () => {
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
        setUserPosts((prev) => [...prev, ...res.postInfo.posts]);
        console.log('fetch posts length : ', res.postInfo.posts.length);
        if (res.postInfo.posts.length < 5) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log('error in show more functionality : ', err);
    }
  }

  const handleDeletePost = async () => {
    setOpenModal(false);
    try {
      const data = await fetch(`http://localhost:3000/api/post/delete-post?postId=${postIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await data.json();
      if (!data.ok) {
        toast.error('post not deleted', {
          position: 'top-center'
        });
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id != postIdToDelete)
        )
        toast.success('post deleted', {
          position: 'top-center'
        })
      }
      // console.log("post deleted : ", postIdToDelete);
    } catch (err) {
      console.log("error in deleting post : ", err);
    }
  }

  // console.log('user posts : ', userPosts);

  return (
    <>
      {
        loadingPost == false ? <>
          <div className='overflow-x-auto'>
            {
              userPosts?.length > 0 ? <>
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>
                      <span className="sr-only">show</span>
                    </Table.HeadCell>
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
                            <Table.Cell>
                              <a onClick={() => {
                                navigate(`/post/${post._id}`)
                              }} className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                show
                              </a>
                            </Table.Cell>
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
                              <a onClick={() => { setOpenModal(true), setPostIdToDelete(post._id) }} className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                delete
                              </a>
                              <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                                <Modal.Header />
                                <Modal.Body>
                                  <div className="text-center">
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Are you sure you want to delete this post?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                      <Button color="failure" onClick={handleDeletePost}>
                                        {"Yes, I'm sure"}
                                      </Button>
                                      <Button color="gray" onClick={() => setOpenModal(false)}>
                                        No, cancel
                                      </Button>
                                    </div>
                                  </div>
                                </Modal.Body>
                              </Modal>
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
            <div className='min-h-screen flex justify-center items-center'>
              <Spinner size="xl" />
            </div>
          </>
      }

    </>

  )
}

export default AllPosts