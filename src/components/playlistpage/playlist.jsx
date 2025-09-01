import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


const Playlist = ({ searchInput }) => {
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


const filteredData = playlist.filter((eachItem) =>
  (eachItem?.name || "").toLowerCase().includes(searchInput?.toLowerCase() || "")
);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await fetch('https://apis2.ccbp.in/spotify-clone/featured-playlists');
        const jsonData = await response.json();
        setPlaylist(jsonData.playlists.items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching playlist:', error);
        setIsLoading(false);
      }
    }

    fetchPlaylist();
  }, []);

  return (
    <div className='bg-[#1F1F1F] w-full rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mr-1'>
  {isLoading ? (
    <h1 className='text-2xl sm:text-3xl md:text-5xl text-white font-serif col-span-full text-center'>
      Loading...
    </h1>
  ) : filteredData.length > 0 ? (
    filteredData.map((eachItem) => (
      <div
        key={eachItem.id}
        className='relative group shadow-2xl hover:scale-105 bg-black p-4 rounded-xl transition-transform duration-300 cursor-pointer overflow-hidden h-fit'
      >
        <img
          src={eachItem.images[0].url}
          alt='playlist'
          className='w-full h-44 sm:h-48 object-cover rounded-lg'
        />
        <h1 className='text-white font-bold mt-3 text-base sm:text-lg truncate'>{eachItem.name}</h1>
        <p className='text-gray-500 text-xs mt-1'>
          By: <span className='text-gray-300'>{eachItem.owner.display_name}</span>
        </p>
        <p className='text-gray-500 text-xs mt-1'>🎵 {eachItem.tracks.total} tracks</p>

        <Link to={`/playlist/${eachItem.id}`}>
          <div className='absolute bottom-10 right-3 bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='black'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 5.653v12.694a.75.75 0 0 0 1.142.639l10.569-6.347a.75.75 0 0 0 0-1.278L6.392 5.014a.75.75 0 0 0-1.142.639Z'
              />
            </svg>
          </div>
        </Link>
      </div>
    ))
  ) : (
    //loader spiner //npm react-spinners
     <div className="flex justify-center items-center col-span-full h-135 mb-3">
        <h1 className="text-white font-serif text-center font-bold text-2xl">Loading.....</h1>
    <div className="w-12 h-12 border-6 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  )}
</div>

  );

};
//flex justify-center items-center col-span-full min-h-200
export default Playlist;