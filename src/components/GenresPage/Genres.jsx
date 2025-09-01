
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SiderBar from '../Sidebar/siderbar.jsx';
import Footer from '../Footer/footer.jsx';

const Genres = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

  const navigate = useNavigate();

  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleLogOut = () => {
    Cookies.remove('jwt_token');
    navigate('/', { replace: true });
  };

  const filteredCategoriesData = categoriesData.filter((eachItem) =>
    eachItem.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://apis2.ccbp.in/spotify-clone/categories');
        const jsonData = await response.json();
        setCategoriesData(jsonData.categories.items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
<nav className='min-h-screen w-full bg-black'>
  {/* 🧠 Top Nav */}
  <div className='flex flex-col md:flex-row items-center gap-4 shadow-xl px-4 py-3 sticky top-0 z-50 h-auto md:h-20 bg-black'>
    {/* App Logo */}
    <div className='block flex flex-row justify-around gap-25 items-center md:hidden'>
      <Link to='/premium'>
      <img
        src='https://w0.peakpx.com/wallpaper/601/350/HD-wallpaper-spotify-black-white.jpg'
        alt='app-logo'
        className='w-14 h-14 object-cover rounded-full cursor-pointer'
      />
    </Link>
      
    {/* Home Icon */}
    <Link to='/home'>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiYgytQqMHFGONbKnszTrP-G_eeJeF4ne-Q&s'
        alt='home-logo'
        className='w-9 h-9 object-contain cursor-pointer'
      />
    </Link>
      <button
      className='bg-white text-black font-semibold text-lg rounded-xl px-4 py-2 hover:scale-105 transition-all ml-auto'
      onClick={handleLogOut}
    >
      Log out
    </button>
    </div>
    <Link to='/premium'>
      <img
        src='https://w0.peakpx.com/wallpaper/601/350/HD-wallpaper-spotify-black-white.jpg'
        alt='app-logo'
        className='hidden md:block w-14 h-14 object-cover rounded-full cursor-pointer'
      />
    </Link>

    {/* Home Icon */}
    <Link to='/home'>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiYgytQqMHFGONbKnszTrP-G_eeJeF4ne-Q&s'
        alt='home-logo'
        className='hidden md:block w-9 h-9 object-contain cursor-pointer ml-auto'
      />
    </Link>

    {/* Search Bar */}
    <input
      type='search'
      placeholder='What Do You Want To Play?'
      onChange={handleInput}
      value={searchInput}
      className='border-white text-white w-full md:w-1/3 bg-[#1F1F1F] p-3 rounded ml-auto'
    />

    {/* Log Out Button */}
    <button
      className='hidden md:block bg-white text-black font-semibold text-lg rounded-xl px-4 py-2 hover:scale-105 transition-all ml-auto'
      onClick={handleLogOut}
    >
      Log out
    </button>
  </div>

  {/* 🔥 Page Body */}
  <main className='flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-3 p-2'>
    <SiderBar />

    <div className='bg-[#1F1F1F] h-[100%] w-full rounded-lg shadow-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 sm:p-6 md:p-10 gap-6 mr-3 mb-4'>
      {isLoading ? (
        <h1 className='text-3xl sm:text-5xl text-white font-serif col-span-full text-center'>
          Loading....
        </h1>
      ) : filteredCategoriesData.length > 0 ? (
        filteredCategoriesData.map((eachItem) => (
          <div
            key={eachItem.id}
            className='relative group hover:scale-105 transition-transform duration-300 bg-black p-4 rounded-xl cursor-pointer overflow-hidden h-60 shadow-lg'
          >
            <img
              src={eachItem.icons[0].url}
              alt={eachItem.name}
              className='w-full h-40 object-cover rounded-lg'
            />
            <h1 className='text-white font-semibold mt-2 truncate'>
              {eachItem.name}
            </h1>

            {/* Arrow icon link to category page */}
            <Link to={`/genres/${eachItem.id}`}>
              <div className='absolute bottom-10 right-3 bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='white'
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
        <div className='col-span-full text-center'>
          <img
            src='https://media4.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bnJpczExcjh2cm5pc3R1ZW5lencyeGN3a3c3N3lhNGNhaXU2cW1pNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OiC5BKaPVLl60/200.webp'
            alt='monkey-logo'
            className='mx-auto'
          />
          <h1 className='text-white text-xl sm:text-2xl mt-2 font-bold'>
            DAMN!!!! LOST IT LOST IT FIND WAY
          </h1>
        </div>
      )}
    </div>
  </main>

  <Footer />
</nav>

  );
};

export default Genres;
