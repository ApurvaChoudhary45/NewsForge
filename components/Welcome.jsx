import React from 'react'
import { signIn } from "next-auth/react"
const Welcome = () => {
  return (
    <div>
      <div className='relative z-10 min-h-screen'>
       <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D" alt="no img" className='absolute w-full h-full object-cover blur-sm' />     
      </div>
      <div className='absolute inset-0 flex flex-col items-center z-50 mt-60 gap-10'>
        <h1 className='md:text-9xl text-red-500 font-mono font-bold text-6xl'>FeedForge</h1>
        <p className='md:text-5xl text-red-800 font-serif font-semibold text-2xl'>Where headlines meet hot takes.</p>
        <button className='md:text-3xl text-red-500 border-2 p-3 rounded-4xl cursor-pointer font-bold text-2xl' onClick={() => signIn()}>Enter the Feed</button>
      </div>
    </div>
  )
}

export default Welcome
