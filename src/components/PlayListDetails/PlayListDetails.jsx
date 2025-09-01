import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PageContainer } from '../UseContext/pagenation';
import { useLikedSongs } from '../UseContext/LikedSongs';
import Sidebar from '../Sidebar/siderbar.jsx';
import { useCustomPlaylists } from '../UseContext/CustomPlaylists.jsx';

const PlayListDetails = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const { pageNum, pageSize, setPageNum } = useContext(PageContainer);
  const { likedSongs, addToLiked, removeFromLiked } = useLikedSongs();
  const { addToPlaylist } = useCustomPlaylists();

  const [searchInput, setSearchInput] = useState('');
  const [playlistData, setPlaylistData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogOut = useCallback(() => {
    Cookies.remove('jwt_token');
    navigate('/', { replace: true });
  }, [navigate]);

  const handleInput = useCallback((event) => {
    setSearchInput(event.target.value);
    setPageNum(1);
  }, [setPageNum]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://apis2.ccbp.in/spotify-clone/playlists-details/${playlistId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch playlist data');
        }
        const data = await response.json();
        setPlaylistData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setPageNum(1);
    fetchPlaylist();
  }, [playlistId, setPageNum]);

  const filteredTracks = useMemo(() => {
    if (!playlistData?.tracks?.items) {
      return [];
    }
    return playlistData.tracks.items.filter((item) =>
      item.track.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [playlistData, searchInput]);

  const { totalPages, currentTracks } = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(filteredTracks.length / pageSize));
    const sidx = (pageNum - 1) * pageSize;
    const eidx = sidx + pageSize;
    const currentTracks = filteredTracks.slice(sidx, eidx);
    return { totalPages, currentTracks };
  }, [filteredTracks, pageNum, pageSize]);

  if (isLoading) {
    return <h1 className='text-5xl text-white font-serif text-center mt-20'>Loading...</h1>;
  }

  if (error) {
    return <h1 className='text-3xl text-red-500 text-center mt-20'>Error: {error}</h1>;
  }

  return (
    <nav className='min-h-screen w-full bg-black p-2'>
      {/* NAVBAR */}
      <div className='flex flex-col md:flex-row items-center gap-4 shadow-xl px-4 py-3 sticky top-0 z-50 h-auto md:h-20 bg-black'>
        <div className='block flex flex-row justify-around gap-25 items-center md:hidden'>
          <Link to='/premium'>
            <img src='https://w0.peakpx.com/wallpaper/601/350/HD-wallpaper-spotify-black-white.jpg' alt='app-logo' className='w-14 h-14 object-cover rounded-full cursor-pointer' />
          </Link>
          <Link to='/home'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiYgytQqMHFGONbKnszTrP-G_eeJeF4ne-Q&s' alt='home-logo' className='w-9 h-9 object-contain cursor-pointer' />
          </Link>
          <button className='bg-white text-black font-semibold text-lg rounded-xl px-4 py-2 hover:scale-105 transition-all ml-auto' onClick={handleLogOut}>
            Log out
          </button>
        </div>
        <Link to='/premium'>
          <img src='https://w0.peakpx.com/wallpaper/601/350/HD-wallpaper-spotify-black-white.jpg' alt='app-logo' className='hidden md:block w-14 h-14 object-cover rounded-full cursor-pointer' />
        </Link>
        <Link to='/home'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiYgytQqMHFGONbKnszTrP-G_eeJeF4ne-Q&s' alt='home-logo' className='hidden md:block w-9 h-9 object-contain cursor-pointer ml-auto' />
        </Link>
        <input type='search' placeholder='What Do You Want To Play?' onChange={handleInput} value={searchInput} className='border-white text-white w-full md:w-1/3 bg-[#1F1F1F] p-3 rounded ml-auto' />
        <button className='hidden md:block bg-white text-black font-semibold text-lg rounded-xl px-4 py-2 hover:scale-105 transition-all ml-auto' onClick={handleLogOut}>
          Log out
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className='flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-4 px-3 py-4'>
        <div className='w-full'>
          <Sidebar/>
        </div>
        <div className='bg-[#1F1F1F] w-full rounded-lg shadow-2xl p-5'>
          {/* PLAYLIST HEADER */}
          <div className='flex flex-col md:flex-row items-center gap-6 mb-10'>
            <img src={playlistData?.images?.[0]?.url} alt={playlistData?.name} className='w-40 h-40 md:w-60 md:h-60 object-cover rounded-lg' />
            <div>
              <h1 className='text-white text-3xl md:text-5xl font-bold'>{playlistData?.name}</h1>
              <p className='text-gray-300 mt-2'>{playlistData?.description}</p>
              <p className='text-sm text-gray-400 mt-1'>{playlistData?.followers?.total.toLocaleString()} followers</p>
            </div>
          </div>
          {/* TRACKS */}
          <div className='flex flex-col gap-4'>
            {currentTracks.length > 0 ? (
              currentTracks.map((item, index) => (
                <div key={item.track.id || index} className='bg-black p-4 rounded-lg shadow-xl hover:bg-gray-900 transition-all cursor-pointer hover:scale-[1.01]'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2'>
                    <div>
                      <h3 className='text-white text-lg font-semibold'>{item.track.name}</h3>
                      <p className='text-gray-400 text-sm'>
                        {item.track.artists.map(artist => artist.name).join(', ')}
                      </p>
                    </div>
                    <div className='flex flex-row items-center'>
                      <div className='flex flex-row items-center'>
                        <button
                          onClick={() => {
                            const alreadyLiked = likedSongs.some(song => song.id === item.track.id);
                            if (alreadyLiked) {
                              removeFromLiked(item.track.id);
                            } else {
                              addToLiked({
                                id: item.track.id,
                                name: item.track.name,
                                artists: item.track.artists.map(artist => artist.name).join(', '),
                                preview_url: item.track.preview_url,
                                external_url: item.track.external_urls.spotify,
                              });
                            }
                          }}
                          className='text-2xl text-red-500 hover:scale-125 cursor-pointer'
                        >
                          {likedSongs.some(song => song.id === item.track.id) ? '💖' : '🤍'}
                        </button>
                        <button
                          onClick={() => {
                            const playlistName = prompt('Enter playlist name to add this song:');
                            if (playlistName) {
                              addToPlaylist(playlistName, {
                                id: item.track.id,
                                name: item.track.name,
                                artists: item.track.artists.map(artist => artist.name).join(', '),
                                preview_url: item.track.preview_url,
                                external_url: item.track.external_urls.spotify,
                              });
                              alert(`🎉 Added to "${playlistName}"`);
                            }
                          }}
                          className='text-4xl text-green-400 hover:scale-125 cursor-pointer ml-4'
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {item.track.preview_url ? (
                    <audio controls className="mt-2 w-full md:w-auto">
                      <source src={item.track.preview_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <p className='text-gray-500 text-xs mt-2'>No preview available</p>
                  )}
                  <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className='text-green-400 underline text-sm hover:text-green-300 mt-1 inline-block'>
                    Open in Spotify ↗
                  </a>
                </div>
              ))
            ) : (
              <p className='text-gray-400 text-center'>No tracks found.</p>
            )}
          </div>
        </div>
      </main>

      {/* PAGINATION */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-4 mt-10'>
        <button onClick={() => setPageNum(prev => Math.max(prev - 1, 1))} disabled={pageNum === 1} className='bg-[#1F1F1F] text-white px-4 py-2 rounded-full hover:bg-white hover:text-black disabled:opacity-50 transition'>
          ⬅️
        </button>
        <span className='text-white'>Page {pageNum} of {totalPages}</span>
        <button onClick={() => setPageNum(prev => Math.min(prev + 1, totalPages))} disabled={pageNum === totalPages} className='bg-[#1F1F1F] text-white px-4 py-2 rounded-full hover:bg-white hover:text-black disabled:opacity-50 transition'>
          ➡️
        </button>
      </div><br />
    </nav>
  );
};

export default PlayListDetails;