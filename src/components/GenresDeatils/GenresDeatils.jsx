
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import SiderBar from '../Sidebar/siderbar.jsx';
import { PageContainer } from '../UseContext/pagenation.jsx';


const GenresDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();


  const { pageNum, pageSize, setPageNum } = useContext(PageContainer)

  const [searchInput, setSearchInput] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogOut = () => {
    Cookies.remove('jwt_token');
    navigate('/', { replace: true });
  };

  const handleInput = (event) => {
    setSearchInput(event.target.value);
    setPageNum(1)
  };

  const filteredPlaylists =
    categoryData?.playlists?.items?.filter((playlist) =>
      playlist.name.toLowerCase().includes(searchInput.toLowerCase())
    ) || [];

     // Filter tracks by search input, handle null/undefined states
  // const filteredTracks = playlistData && playlistData.tracks && playlistData.tracks.items
  //   ? playlistData.tracks.items.filter((item) =>
  //       item.track.name.toLowerCase().includes(searchInput.toLowerCase())
  //     )
  //   : [];

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredPlaylists.length / pageSize));
  const sidx = (pageNum - 1) * pageSize;
  const eidx = sidx + pageSize;
  const currentTracks = filteredPlaylists.slice(sidx, eidx);


  useEffect(() => {
    const fetchCategoryPlaylists = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://apis2.ccbp.in/spotify-clone/category-playlists/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category playlists');
        }
        const data = await response.json();
        setCategoryData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCategoryPlaylists();
  }, [categoryId]);

  if (isLoading) {
    return <h1 className="text-5xl text-white font-serif text-center mt-20">Loading...</h1>;
  }

//   if (error) {
//     return <h1 className="text-3xl text-red-500 text-center mt-20">Error: {error}</h1>;
//   }

  return (
    <nav className="min-h-screen w-full bg-black">
      
  {/*  Top Nav */}
  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 shadow-xl px-4 py-3 sticky top-0 z-50 bg-black">
    <div className="flex items-center justify-between w-full sm:w-auto">
      <div className="flex items-center gap-10">
        <Link to="/premium">
          <img
            src="https://w0.peakpx.com/wallpaper/601/350/HD-wallpaper-spotify-black-white.jpg"
            alt="app-logo"
            className="w-14 h-14 object-cover rounded-full cursor-pointer"
          />
        </Link>
        <Link to="/home">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiYgytQqMHFGONbKnszTrP-G_eeJeF4ne-Q&s"
            alt="home-logo"
            className="w-9 h-9 object-contain cursor-pointer ml-auto"
          />
        </Link>
      </div>
    </div>

    <input
      type="search"
      placeholder="Search Playlists..."
      onChange={handleInput}
      value={searchInput}
      className="border-white text-white w-full sm:w-1/2 bg-[#1F1F1F] p-3 rounded ml-auto"
    />
    <button
        className="bg-white text-black font-semibold text-sm sm:text-lg rounded-xl px-4 py-2 hover:scale-105 transition-all sm:ml-auto"
        onClick={handleLogOut}
      >
        Log out
      </button>
  </div>

  {/*  Main Content */}
  <main className="flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-4 p-4 sm:p-6">
    <SiderBar />

    <div className="bg-[#1F1F1F] h-[100%] w-full rounded-lg shadow-2xl p-4 sm:p-8">
      <h1 className="text-white text-2xl sm:text-4xl font-bold mb-6">
        Playlists in this Genre
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentTracks.length > 0 ? (
          currentTracks.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-black p-5 rounded-lg shadow-xl hover:bg-gray-900 transition-all cursor-pointer hover:scale-105"
            >
              <img
                src={playlist.images?.[0]?.url}
                alt={playlist.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-white text-lg font-bold">{playlist.name}</h2>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {playlist.description}
              </p>
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline text-sm mt-2 inline-block hover:text-green-300"
              >
                Open in Spotify ↗
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No playlists found.
          </p>
        )}
      </div>
    </div>
  </main>

  {/* ⏭ Pagination Controls */}
  <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3 mr-4 mt-6 sm:mt-9">
    <button
      onClick={() => setPageNum((prev) => Math.max(prev - 1, 1))}
      disabled={pageNum === 1}
      className="bg-[#1F1F1F] text-white px-4 py-2 rounded-full hover:bg-white disabled:opacity-50"
    >
      ⬅️
    </button>

    <span className="text-white text-sm sm:text-base">
      Page {pageNum} of {totalPages}
    </span>

    <button
      onClick={() => setPageNum((prev) => Math.min(prev + 1, totalPages))}
      disabled={pageNum === totalPages}
      className="bg-[#1F1F1F] text-white px-4 py-2 rounded-full hover:bg-white disabled:opacity-50"
    >
      ➡️
    </button>
  </div>

  <br />
</nav>

  );
};

export default GenresDetails;
