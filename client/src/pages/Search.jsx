import { HR, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard';

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'Others'
    })
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermUrl = urlParams.get('searchTerm');
        const sortUrl = urlParams.get('sort');
        const categoryUrl = urlParams.get('category');

        if (searchTermUrl || sortUrl || categoryUrl) {
            setSearchData({
                ...searchData,
                searchTerm: searchTermUrl,
                sort: sortUrl,
                category: categoryUrl
            })
        }



        const fetchPosts = async () => {
            try {
                setLoading(true);
                const urlParams = new URLSearchParams(location.search);
                const searchQuery = urlParams.toString();
                const res = await fetch(`http://localhost:3000/api/post/getPosts?${searchQuery}`);
                const data = await res.json();
                if (!res.ok) {
                    setLoading(false);
                    console.log('error in getting posts api : ', data.message);
                } else {
                    setLoading(false);
                    setPosts(data.postInfo.posts);
                    if (data.postInfo.posts.length >= 9) {
                        setShowMore(true);
                    } else {
                        setShowMore(false);
                    }
                }
            } catch (err) {
                console.log('error in getting posts : ', err);
                setLoading(false);
            }
        }

        fetchPosts();

    }, [location.search]);
    console.log('search Form Data : ', searchData);
    console.log('posts : ', posts);

    const handleApplyFilter = () => {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchData.searchTerm);
        urlParams.set('sort', searchData.sort);
        urlParams.set('category', searchData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleShowMore = async()=>{
        try {
            const startFrom = posts.length;
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('startFrom',startFrom);
            const searchQuery = urlParams.toString();
            const res = await fetch(`http://localhost:3000/api/post/getPosts?${searchQuery}`);
            const data = await res.json();
            if(!res.ok){
                console.log('erorr in show more api : ',err);
                return;
            }else{
                setPosts([...posts,...data.postInfo.posts]);
                if (data.postInfo.posts.length >= 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
                
            }
        } catch (err) {
            console.log('error in show more : ',err);
        }
    }

    return (
        <>
            <div className="container flex flex-col md:flex-row italic">
                <div className="pr-2 left md:min-h-screen md:w-1/4 flex flex-col gap-2 mx-auto md:border-r md:border-r-gray-500">
                    <div className='text-center mt-1 font-bold'>
                        <span>Filter</span>
                    </div>
                    <form >
                        <div className="search flex gap-2 mt-0 p-1">
                            <label htmlFor="search" className='mt-0'>Search</label>
                            <input type="text"
                                id='search'
                                className='h-8 text-gray-700 text-sm'
                                value={searchData.searchTerm}
                                onChange={(e) => {
                                    setSearchData({ ...searchData, searchTerm: e.target.value });
                                }}
                            />
                        </div>
                        <div className="category flex gap-2 mt-2 p-1">
                            <label htmlFor="category" className='mt-0'>category</label>
                            <select className='text-sm h-8 p-1 text-gray-700' id='category'
                                value={searchData.category}
                                onChange={(e) => {
                                    setSearchData({ ...searchData, category: e.target.value });
                                }}
                            >
                                <option value="">choose your category</option>
                                <option value="Food">Food</option>
                                <option value="Technology">Technology</option>
                                <option value="Movie">Movie</option>
                                <option value="Education">Education</option>
                                <option value="Politics">Politics</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="sort flex gap-2 mt-2 p-1 mx-16">
                            <label htmlFor="sort" className='mt-0'>sort</label>
                            <select className='text-sm h-8 p-1 text-gray-700' id='sort'
                                value={searchData.sort}
                                onChange={(e) => {
                                    setSearchData({ ...searchData, sort: e.target.value });
                                }}
                            >
                                <option value="desc">latest</option>
                                <option value="asc">oldest</option>
                            </select>
                        </div>
                    </form>
                    <div className='text-center font-bold italic'>
                        <button onClick={handleApplyFilter} className='py-1 px-16 border rounded-xl mt-2 bg-teal-400 hover:bg-teal-500'>
                            Apply
                        </button>
                    </div>
                    <HR className='mt-3' />
                </div>

                <div className="right min-h-screen w-full p-2 flex flex-col ">
                    <div className="upper text-center font-bold">
                        <span>Posts Results :</span>
                    </div>
                    <HR className='my-2' />
                    <div className="lower mt-2 flex md:flex-row md:flex-wrap flex-col gap-2">
                        {
                            !loading && posts.length == 0 &&
                            <div className='md:w-full text-gray-500 md:min-h-screen md:justify-center md:flex md:items-center'>
                                No Post Found .
                            </div>
                        }
                        {
                            !loading &&
                            posts.map((post) => {
                                return (
                                    <PostCard key={post._id} post={post} />
                                )
                            })
                        }
                        {
                            loading &&
                            <div className='flex justify-center min-h-screen items-center md:w-full'>
                                <Spinner size='xl' />
                            </div>
                        }
                    </div>
                    <div className="show text-center mt-3 font-bold text-teal-400 hover:text-teal-500">
                        {showMore && 
                        <button onClick={handleShowMore}>
                            . . . view more . . .
                        </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search