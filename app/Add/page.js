
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toggleMode } from '@/Redux/Dark/dark'
import { useSelector, useDispatch } from 'react-redux';
export default function AddPostPage() {
    const darkMode = useSelector(state => state.darker.mode)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        urlToImage: '',
        url: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj ={
            title: formData.title,
        author: formData.author,
        description: formData.description,
        urlToImage: formData.urlToImage,
        url: formData.url
        }
        const data = await fetch('/api/logpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(obj), // Convert the data to a JSON string
        })

        // After successful post
        router.push('/');
    };

    return (
        <div className={`max-w-xl mx-auto mt-10 p-6  rounded-xl shadow-lg`}>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add a New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        rows="4"
                        required
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="url"
                        name="urlToImage"
                        value={formData.urlToImage}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />
                </div>

                {/* News URL */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">News Article URL</label>
                    <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Post
                </button>
                <Link href ='/'><button
                    type="submit"
                    className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Back
                </button></Link>
            </form>
        </div>
    );
}
