import { getNewPosts, getPosts } from '@/Redux/New/newSlice'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { FiThumbsUp, FiBookmark, FiExternalLink } from 'react-icons/fi'
import { FaThumbsUp } from 'react-icons/fa';
import Spinner from './Spinner';
import { liked, likedPost } from '@/Redux/Liked/liked';
import { savedPost } from '@/Redux/Saved/saved';
import { FaBookmark } from 'react-icons/fa'
import { toggleMode } from '@/Redux/Dark/dark';
const Post = () => {
  const darkMode = useSelector(state => state.darker.mode)
  const card = useSelector(state => state.reader.cards)
  const search = useSelector(state => state.searcher.search)
  const feat = useSelector(state => state.featuring.feature)
  const onlyliked = useSelector(state => state.liking.allLike)
  const onlysaved = useSelector(state => state.saving.allsave)
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const pageSize = 10
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    urlToImage: '',
    url: ''
  });


  const addLike = async (index) => { // function to like a post and then log it into the DB
    dispatch(likedPost(index));
    const savedItem = card?.[index];
    let obj = {
      title: savedItem.title,
      author: savedItem.author,
      description: savedItem.description,
      urlToImage: savedItem.urlToImage,
      url: savedItem.url
    }

    const logAdd = await fetch('/api/likedPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify(obj), // Convert the data to a JSON string
    })
  }
  const removeLike = async (index) => {
    dispatch(likedPost(index));

    const removeAdd = await fetch('/api/unlikedPost', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify(index), // Convert the data to a JSON string
    })
  }
  const savedPostt = async (index) => { // function to like a post and then log it into the DB
    dispatch(savedPost(index));
    const savedItem = card?.[index];
    let obj = {
      title: savedItem.title,
      author: savedItem.author,
      description: savedItem.description,
      urlToImage: savedItem.urlToImage,
      url: savedItem.url
    }

    const logAdd = await fetch('/api/savedpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify(obj), // Convert the data to a JSON string
    })
  }
  const removeSave = async (index) => {
    dispatch(savedPost(index));

    const removeAdd = await fetch('/api/removedSaved', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify(index), // Convert the data to a JSON string
    })
  }
  useEffect(() => {
    const fetcher = async () => {
      setloading(true)
      try {
        const getCards = await fetch(`https://newsapi.org/v2/?q=${search}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`)
        const saveCards = await getCards.json()
        if (page == 1) {
          dispatch(getPosts(saveCards?.articles))
        }
        else {
          dispatch(getNewPosts(saveCards?.articles))
        }

      } catch (error) {
        console.log('There was an error', error)
      }
      setloading(false)
    }
    fetcher()
  }, [dispatch, page, search])
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && !loading) {
        setpage((prev) => prev + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading])

  useEffect(() => {
    const fetched = async () => {
      setloading(true)
      try {
        const getCards = await fetch(`https://newsapi.org/v2/everything?q=${feat}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`)
        const saveCards = await getCards.json()
        if (page == 1) {
          dispatch(getPosts(saveCards?.articles))
        }
        else {
          dispatch(getNewPosts(saveCards?.articles))
        }

      } catch (error) {
        console.log('There was an error', error)
      }
      setloading(false)
    }
    fetched()
  }, [dispatch, page, feat])
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && !loading) {
        setpage((prev) => prev + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading])
  return (
    <div className={`relative z-40 flex justify-center items-center py-25 px-2 ${darkMode ? ('bg-black/80') : ('bg-white')}`}>
      <div className='grid grid-cols-1'>
        <div className='flex justify-end'>

        </div>
        {loading ? (<Spinner />) : (Array.isArray(card) && card.map((item, index) => {
          const isLike = onlyliked.includes(index)
          const isSave = onlysaved.includes(index)
          return (<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-2xl mx-auto mb-6" key={index}>

            {/* Image */}
            <img
              src={item.urlToImage}
              alt="news"
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>

              {/* Author + Date */}
              <div className="text-sm text-gray-500 mb-4">
                {item.author}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4">
                {item.description}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between">

                {/* Left: Icons */}
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1 hover:text-red-600 cursor-pointer">
                    {isLike ? (<FaThumbsUp className="text-blue-500" onClick={() => removeLike(index)} />) : (<FiThumbsUp onClick={() => addLike(index)} />)}
                    

                  </div>

                  <div className="hover:text-blue-600 cursor-pointer">
                    {isSave ? (<FaBookmark className="text-blue-500" onClick={() => removeSave(index)} />) : (<FiBookmark onClick={() => savedPostt(index)} />)}
                  </div>
                </div>

                {/* Right: Link */}
                <a
                  href={item.url}
                  className="text-sm text-red-500 hover:underline flex items-center"
                >
                  Read More <FiExternalLink className="ml-1" />
                </a>
              </div>
            </div>
          </div>)
        }))}


      </div>

    </div>
  )
}

export default Post
