import React from 'react'
import { Link } from 'react-router-dom';




function Siderbar() {
  return (
    <div>
       <div className='text-white sticky bg-[#1F1F1F] p-6 shadow-2xl rounded-lg ml-2 font-sans h-fit md:top-20 w-100 '>
          <div className='flex flex-row justify-between'>
            <h1 className="font-bold text-2xl">Your Library</h1>
          </div>
          <div className="bg-black rounded-lg p-4 flex flex-col gap-1 m-2 md:top-20">
            <h1 className="font-bold text-sm m-1">Browse Your Fav Genres</h1>
            <p className="font-semibold text-sm m-2">It's easy, we'll help you.</p>
            <Link to="/BrowseGenres">
              <button className="bg-white text-black text-sm font-bold p-1 rounded-full w-[50%] hover:text-white transition hover:bg-[#1DB954] cursor-pointer hover:scale-105">Browse Genres</button>
            </Link>
          </div>
          <div className="bg-black rounded-lg p-4 flex flex-col gap-1 m-2 md:top-20">
            <h1 className="font-bold text-sm m-1">Lets Find Some Podcast to Listen</h1>
            <p className="font-semibold text-sm m-2">We'll keep you updated on new Releases.<br />Listen Releases</p>
            <Link to="/newreleases">
              <button className="bg-white text-black text-sm font-bold p-1 m-1 rounded-full w-[50%] hover:text-white transition hover:bg-[#1DB954] cursor-pointer hover:scale-105">New Releases</button>
            </Link>
          </div>
          <div className="flex flex-col gap-6 m-6">
            <Link to="/LikedSongsPage">
              <button className="bg-white text-black rounded-full p-1 font-bold p-2  hover:bg-green-500 cursor-pointer w-full"> 💕Liked Songs</button>
            </Link>
            <Link to="/YourPlaylists">
              <button className="bg-white text-black rounded-full p-1 font-bold p-2  hover:bg-green-500 cursor-pointer w-full"> 🎶Add PlayLists</button>
            </Link>
          <button className='text-lg cursor-not-allowed bg-white text-black rounded-full font-bold p-2 '> English</button>
          </div>
        </div>
    </div>
    
  )
}
export default Siderbar
