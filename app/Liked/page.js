'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import { FiThumbsUp, FiBookmark, FiExternalLink, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'
import { FiPlus } from 'react-icons/fi'
import { useSession, signOut } from "next-auth/react"
import { toggleMode } from '@/Redux/Dark/dark'
import { useSelector, useDispatch } from 'react-redux'
const page = () => {
    const [profile, setprofile] = useState(false)
    const darkMode = useSelector(state => state.darker.mode)
    let menu = ['Posts', 'Liked', 'Saved']
    const { data: session } = useSession()
     const dispatch = useDispatch()
    const [personal, setpersonal] = useState([])
    const [loading, setloading] = useState(false)
    const newModal = () => {
        setprofile(!profile)
    }
    useEffect(() => {
        const fetched = async () => {
            setloading(true)
            try {
                const newly = await fetch('/api/getlikedPost')
                const res = await newly.json()
                setpersonal(res?.posts)
            } catch (error) {
                console.log('Unable to fetch the data')
            }
            setloading(false)
        }
        fetched()
    }, [])

    return (
        <>
            <div>
                <div>
                    <nav className={`w-full ${darkMode ? ('bg-black/80') : ('bg-white/20')} backdrop-blur-md text-red-600 flex items-center justify-between px-6 py-4 shadow-md fixed top-0 z-50`}>
                        <Link href='/'><FiArrowLeft size={24} className='cursor-pointer' /></Link>
                        <div className="text-2xl font-bold tracking-wide cursor-pointer">
                            FeedForge
                        </div>



                        {/* Right Section: Avatar, Notifications, Logout */}
                        <div className="flex items-center space-x-4">
                            <div className='flex justify-center items-center gap-2 hover:bg-gray-200 rounded-3xl px-3'>
                                <Link href='/Add'><FiPlus size={24} /></Link>
                                <Link href='/Add'>

                                    <button className='inline-block relative z-60 px-3 py-2 rounded-3xl text-black cursor-pointer font-mono'>Create</button></Link>
                            </div>
                            

                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold cursor-pointer" onClick={newModal}>
                                {session?.user?.name.charAt(0)}
                            </div>

                            {/* Logout */}
                            <button className="px-3 py-2 border border-red-600 rounded-full text-sm hover:bg-red-600 hover:text-white transition duration-150 cursor-pointer md:block hidden" onClick={() => signOut()}>
                                Logout
                            </button>
                        </div>
                    </nav>
                    <div className="z-20" />

                    {profile && <div className="fixed right-3 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-4">


                            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                                <h4 className="font-semibold mb-2 text-lg">👨‍🏫 {session?.user?.name}</h4>
                                {menu.map((item, index) => {
                                    return (<div key={index}>
                                        <Link href={`/${item}`}><button className="py-2 flex justify-between items-center text-center text-sm cursor-pointer hover:text-red-500">
                                            <span>{item}</span>
                                        </button></Link>
                                    </div>)
                                })}
                            </ul>
                            <div className='flex items-center gap-5 '>
                                <div className='relative text-sm hover:text-red-500 cursor-pointer'>Dark Mode</div>
                                <label className=" cursor-pointer">
                                    {/* Switch Container */}
                                    <div className="relative">
                                        {/* Hidden checkbox */}
                                        <input type="checkbox" className="sr-only peer" onClick={() => dispatch(toggleMode())} />

                                        {/* Slider */}
                                        <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-400 transition duration-300" ></div>

                                        {/* Toggle circle */}
                                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-6"></div>
                                    </div>

                                </label>


                            </div>
                            <button className="mt-2 px-2 py-1 border border-red-600 rounded-full text-sm hover:bg-red-600 hover:text-white transition duration-150 cursor-pointer md:hidden block" onClick={() => signOut()}>
                                                        Logout
                                                    </button>

                        </div>
                    </div>}
                </div>

            </div>
            <div className={`relative z-40 flex justify-center items-center py-20 px-2 ${darkMode ? ('bg-black/80') : ('bg-white/20')}`}>
                <div className='grid grid-cols-1'>
                    <div className='flex justify-end'>

                    </div>
                    {loading ? (<Spinner />) : (Array.isArray(personal) && personal.map((item, index) => {
                        return (<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-2xl mx-auto mb-6" key={index}>

                            {/* Image */}
                            <Image
                                src={item.urlToImage}
                                alt="news"
                                width={800}
                                height={300}
                                className="rounded-xl object-cover"

                                loading="lazy"
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
        </>
    )
}

export default page
