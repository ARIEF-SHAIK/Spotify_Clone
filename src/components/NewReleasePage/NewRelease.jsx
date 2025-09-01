import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SiderBar from '../Sidebar/siderbar.jsx';
import Footer from '../Footer/footer.jsx';
import Home from '../Home/home.jsx';



const NewRelease = () => {
  const [albums, setAlbums] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove('jwt_token');
    navigate('/', { replace: true });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredAlbums = Array.isArray(albums) ? albums.filter((album) => {
    const albumName = (album?.name || '').toLowerCase();
    const artistNames = Array.isArray(album?.artists)
      ? album.artists.map((a) => (a?.name || '').toLowerCase()).join(' ')
      : '';
    return (
      albumName.includes(searchInput.toLowerCase()) ||
      artistNames.includes(searchInput.toLowerCase())
    );
  }) : [];

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://apis2.ccbp.in/spotify-clone/new-releases?country=IN');
        if (!response.ok) {
          throw new Error('Failed to fetch new releases');
        }

        const data = await response.json();
        setAlbums(data.albums.items);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  if (isLoading) {
    return <h1 className="text-5xl text-white text-center mt-20">Loading new releases...</h1>;
  }

  if (error) {
    return <h1 className="text-3xl text-red-500 text-center mt-20">Error: {error}</h1>;
  }

  return (
    <div className="min-h-screen w-full bg-black">
  {/* Navbar */}
  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 shadow-xl px-4 py-3 sticky top-0 z-50 bg-black">
    <div className="flex items-center justify-around w-full sm:w-auto">
      <div className="flex gap-18 items-center">
        <Link to="/premium">
          <img
            src="https://w0.peakpx.com/wallpaper/601/350/HD-wallpaper-spotify-black-white.jpg"
            alt="app-logo"
            className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full cursor-pointer"
          />
        </Link>

        <Link to="/home">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiYgytQqMHFGONbKnszTrP-G_eeJeF4ne-Q&s"
            alt="home-logo"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain cursor-pointer"
          />
        </Link>
      </div>
    </div>

    <input
      type="search"
      placeholder="Search Albums or Artists..."
      onChange={handleSearchInput}
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

  {/* 📦 Main Content */}
  <main className="flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-4 p-4 sm:p-6">
    <SiderBar />

    <div className="bg-[#1F1F1F] w-full rounded-lg shadow-2xl p-4 sm:p-8">
      <h1 className="text-white text-2xl sm:text-4xl font-bold mb-6">😍 New Releases</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-black p-5 rounded-lg shadow-lg hover:bg-gray-900 transition-all cursor-pointer hover:scale-105 group relative"
            >
              <img
                src={album.images?.[0]?.url}
                alt={album.name}
                className="w-full h-44 sm:h-48 object-cover rounded"
              />
              <h2 className="text-white text-base sm:text-lg font-bold mt-3">{album.name}</h2>
              <p className="text-gray-400 text-sm mt-1 truncate">
                {album.artists.map((artist) => artist.name).join(', ')}
              </p>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline text-sm mt-2 inline-block hover:text-green-300"
              >
                Open in Spotify ↗
              </a>

              <div className="absolute bottom-10 right-3 bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653v12.694a.75.75 0 0 0 1.142.639l10.569-6.347a.75.75 0 0 0 0-1.278L6.392 5.014a.75.75 0 0 0-1.142.639Z"
                  />
                </svg>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No albums found.</p>
        )}
      </div>
    </div>
  </main>

  <Footer />
</div>

  );
};

export default NewRelease;
