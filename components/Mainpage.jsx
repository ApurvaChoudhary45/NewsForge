import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchPost } from '@/Redux/Search/search'
import { FiSearch } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { featuredPost } from '@/Redux/Featured/featured'
import { motion } from 'framer-motion'
import { useSession, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import ChatbotWidget from './ChatbotWidget'
import { useSelector } from 'react-redux'
import { toggleMode } from '@/Redux/Dark/dark'
const Mainpage = () => {
    const darkMode = useSelector(state => state.darker.mode)
    const { data: session } = useSession()
    const [modal, setmodal] = useState(false)
    const [search, setsearch] = useState('')
    const [profile, setprofile] = useState(false)
    const [activeTab, setactiveTab] = useState('Home')
    const dispatch = useDispatch()
    const pathname = usePathname()
    const searchHandler = () => {
        dispatch(searchPost(search))
    }
    const showModal = () => {
        setmodal(!modal)
    }
    const newModal = () => {
        setprofile(!profile)
    }
    let section = ['🏠 Home', '🎮 Game', '🔬 Science', '🎵 Music', '🐱 Anime', '📔 Education', '🛍️ Fashion', '🌲 Nature', '💼 Business', '🍔 Food', '🎬 Movie', '🖥️ Technology', '🎨 Arts', '⚽ Sports', '😷 Wellness']

    let menu = ['Posts', 'Liked', 'Saved']

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func.apply(this, args)
            }, delay);
        }
    }

    const searchHandling = (value) => {
        console.log('Search for:', value)

    }
    const handleIt = debounce(searchHandling, 500)

    return (
        <div>
            <div>
                <nav className={`w-full ${darkMode ? (`bg-black/80`) : (`bg-white/20`)}  backdrop-blur-md ${darkMode ? (`text-white`) : (`text-red-600`) } flex items-center justify-between px-6 py-4 shadow-md fixed top-0 z-50`}>
                    <FiMenu size={24} className='cursor-pointer' onClick={showModal} />
                    <div className="text-2xl font-bold tracking-wide cursor-pointer ml-3">
                        FeedForge
                    </div>

                    {/* Search */}
                    <div className="flex-1 mx-6 relative">
                        <input
                            type="text"
                            placeholder="Search headlines, tags, or users..."
                            className="md:w-full md:px-4 md:py-2 rounded-full bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 w-full px-4 py-1"
                            value={search}
                            onChange={(e) => {
                                setsearch(e.target.value);
                                handleIt(e.target.value)
                            }}

                        />
                        <FiSearch className="absolute md:right-3 right-0 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} onClick={searchHandler} />
                    </div>

                    {/* Right Section: Avatar, Notifications, Logout */}
                    <div className="flex md:items-center md:space-x-4">
                        <div className='flex justify-center items-center md:gap-2 gap-2 hover:bg-gray-200 rounded-3xl md:px-3'>
                            <Link href='/Add'><FiPlus size={24}  /></Link>
                            <Link href='/Add'>

                                <button className={`hidden relative z-60 px-3 py-2 rounded-3xl md:inline-block ${darkMode ? ('text-white') : ('text-black')}  cursor-pointer font-mono`}>Create</button></Link>
                        </div>
                        

                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full ${darkMode ? ('bg-black/30') : ('bg-red-500')}  flex items-center justify-center text-white font-bold cursor-pointer`} onClick={newModal}>
                            {session?.user?.name.charAt(0)}
                        </div>

                        {/* Logout */}
                        <button className="px-3 py-2 border border-red-600 rounded-full text-sm hover:bg-red-600 hover:text-white transition duration-150 cursor-pointer md:block hidden" onClick={() => signOut()}>
                            Logout
                        </button>
                    </div>
                </nav>
                <div className="z-20" />

                {/* Full-height Sidebar Modal */}
                {modal && <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] md:w-1/6 w-1/2 ${darkMode ? ('bg-black/80 ') : ('bg-gray-100 ')} z-70 shadow-lg overflow-y-auto transform transition-transform duration-300 ease-in-out translate-x-0 text-center ${darkMode ? (`text-white`) : ('text-black')} backdrop-blur-md bg-white/20`}>
                    {section.map((item, index) => {
                        return (<div key={index} >
                            <button className="relative p-4 text-lg px-8 font-mono cursor-pointer hover:font-semibold hover:text-red-500" onClick={() => { setactiveTab(item); dispatch(featuredPost(item)) }} >
                                {activeTab === item && (<motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gray-300 rounded-2xl z-0 h-16 w-full"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />)}
                                <span className='relative z-10'>
                                    {item}
                                </span>

                            </button>

                        </div>
                        )
                    })}

                </div>}
                {profile && <div className="fixed right-3 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-20">
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
                                    <input type="checkbox" className="sr-only peer" onClick={()=>dispatch(toggleMode())} />

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
                <ChatbotWidget />
            </div>

        </div>

    )
}

export default Mainpage
