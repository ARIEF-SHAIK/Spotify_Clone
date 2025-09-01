import { useLikedSongs } from '../UseContext/LikedSongs';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../UseContext/pagenation';


const LikedSongs = () => {
  const { likedSongs, removeFromLiked } = useLikedSongs();

  const { pageNum, pageSize, setPageNum } = useContext(PageContainer)

  const [searchInput, setSearchInput] = useState('');

  const filteredSongs = likedSongs.filter(song =>
  song.name.toLowerCase().includes(searchInput.toLowerCase()) ||
  song.artists.toLowerCase().includes(searchInput.toLowerCase())
);

  const totalPages = Math.max(1, Math.ceil(filteredSongs.length / pageSize));
  const sidx = (pageNum - 1) * pageSize;
  const eidx = sidx + pageSize;
  const currentTracks = filteredSongs.slice(sidx, eidx);


  function handleInput(event) {
    setSearchInput(event.target.value);
    setPageNum(1)
  }

  return (
    <div className='p-4 md:p-10 bg-black min-h-screen text-white'>
  {/* HEADER */}
  <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-8'>
    {/* Logo */}
    <Link to="/home">
    <button className="bg-white text-black rounded-full p-1 font-bold p-2  hover:bg-green-500 cursor-pointer">Back To Home </button>
    </Link>

    {/* Title */}
    <h1 className='text-2xl md:text-4xl font-bold uppercase text-center'>❤️ Your Liked Songs</h1>

    {/* Search */}
    <input
      type='search'
      placeholder='What Do You Want To Play?'
      onChange={handleInput}
      value={searchInput}
      className='border border-white text-white bg-[#1F1F1F] p-3 rounded w-full md:w-1/3'
    />
  </div>

  {/* SONGS LIST */}
  {currentTracks.length === 0 ? (
    <p className='text-gray-400 text-center md:text-center p-5'>OOPS! You haven’t liked any songs yet.</p>
  ) : (
    currentTracks.map((song) => (
      <div
        key={song.id}
        className='mb-5 bg-[#1F1F1F] p-4 rounded-xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4'
      >
        {/* Song Info */}
        <div className='flex-1'>
          <h2 className='text-xl'>{song.name}</h2>
          <p className='text-sm text-gray-400 mt-2'>{song.artists}</p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromLiked(song.id)}
          className='text-red-400 text-sm uppercase hover:text-red-300 mt-2 md:mt-0'
        >
          ❌
        </button>

        {/* Audio Preview */}
        <div className='w-full md:w-auto'>
          {song.preview_url ? (
            <audio controls className='w-full md:w-56 mt-2'>
              <source src={song.preview_url} type='audio/mpeg' />
            </audio>
          ) : (
            <p className='text-xs text-gray-500'>No preview<br />We Have The Error From Our Side.</p>
          )}
        </div>
      </div>
    ))
  )}

  {/* PAGINATION */}
  <div className='flex flex-col sm:flex-row justify-center md:justify-end items-center gap-4 mt-10'>
    <button
      onClick={() => setPageNum(prev => Math.max(prev - 1, 1))}
      disabled={pageNum === 1}
      className='bg-[#1F1F1F] text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition disabled:opacity-50'
    >
      ⬅️
    </button>

    <span className='text-white'>Page {pageNum} of {totalPages}</span>

    <button
      onClick={() => setPageNum(prev => Math.min(prev + 1, totalPages))}
      disabled={pageNum === totalPages}
      className='bg-[#1F1F1F] text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition disabled:opacity-50 '
    >
      ➡️
    </button>
  </div><br />
</div>

    
  );
};

export default LikedSongs;