'use client'
import { useState } from 'react'

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [userMessage, setUserMessage] = useState('')
    const [messages, setmessages] = useState([])
    const chatMessage = () => {
        let obj = {
            message: userMessage,
            sender: 'User'
        }
        setmessages([...messages, obj])

        setTimeout(() => {
            if (obj.message.includes('Hii') || obj.message.includes('Hello') || obj.message.includes('Hi')) {
                setmessages(prev => [...prev, { message: 'Hi there', sender: 'Bot' }])
            }
            if (obj.message.includes('more') || obj.message.includes('details') || obj.message.includes('extra')) {
                setmessages(prev => [...prev, { message: "Hi To read more, just click the 'Read More' button on the post. You'll  see the detailed about the post.", sender: 'Bot' }])
            }
            if (obj.message.includes('save')) {
                setmessages(prev => [...prev, { message: "Hi To read more, just click the 'Read More' button on the post. You'll  see the detailed about the post.", sender: 'Bot' }])
            }
            if (obj.message.includes('later')) {
                setmessages(prev => [...prev, { message: "Yes! Click the bookmark icon on any post to save it. You can view your saved posts in your profile.", sender: 'Bot' }])
            }
            if (obj.message.includes('search')) {
                setmessages(prev => [...prev, { message: "Definitely. Use the search bar at the top to find posts by title, tags, or author.", sender: 'Bot' }])
            }
            if (obj.message.includes('latest') ) {
                setmessages(prev => [...prev, { message: "You can check the 'Posts' section to find the most recent updates. We keep it fresh every week!.", sender: 'Bot' }])
            }
            if (obj.message.includes('liked')) {
                setmessages(prev => [...prev, { message: "Head to your profile and tap on the 'Liked' section to see all posts you've liked.", sender: 'Bot' }])
            }
            if (obj.message.includes('support') ) {
                setmessages(prev => [...prev, { message: "Hi you can always come to me for support. I would be more than happy o assist you.", sender: 'Bot' }])
            }
            if (obj.message.includes('dark')) {
                setmessages(prev => [...prev, { message: "Yes! You can toggle dark mode from the top-right menu or your profile settings.", sender: 'Bot' }])
            }
        }, 2000);
        setUserMessage('')
    }

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg z-50 cursor-pointer hover:bg-red-700"
            >
                💬
            </button>

            {/* Chat Modal */}
            {isOpen && (
                <div className="fixed bottom-24 right-5 w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col z-50">
                    {/* Header */}
                    <div className="bg-red-600 text-white px-4 py-2 rounded-t-xl font-semibold">
                        Chat Assistant
                    </div>

                    {/* Messages (placeholder) */}
                    <div className="flex-1 p-4 text-sm overflow-y-auto">
                        <p className="text-gray-400">Ask me anything about the newsletter!</p>

                        {messages?.map((item, index) => {
                            return (<div key={index} className='overflow-y-auto p-4 flex-1' >
                                {item.sender === 'User' ? (<div className='flex justify-start w-full'><p className='text-white font-semibold text-md bg-blue-400 px-4 py-2 rounded-2xl'>{item.message}</p></div>) : (<div className='flex justify-end w-full'><div className='flex flex-col justify-end items-end bg-gray-500 font-semibold w-fit rounded-2xl my-5 p-2 text-md'>{item.message}</div></div>)}

                            </div>)
                        })}
                        {/* <div ref={scrollRef}/> */}

                    </div>

                    {/* Input + Send */}
                    <div className="p-3 border-t border-gray-200">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md mb-2 focus:outline-none"
                        />
                        <button
                            className="w-full bg-red-600 text-white py-2 rounded-md text-sm hover:bg-red-700 transition cursor-pointer" onClick={chatMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
