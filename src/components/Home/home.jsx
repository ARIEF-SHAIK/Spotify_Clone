import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/siderbar.jsx';
import Cookies from 'js-cookie';
import Footer from '../Footer/footer.jsx';
import Playlist from '../playlistpage/playlist.jsx';
const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate()

  function handleInput(event) {
    setSearchInput(event.target.value);
  }
  function handleLogOut() {
    Cookies.remove('jwt_token')
    navigate('/',{replace:true})
  }
return (
    <div>
        <nav className="min-h-screen bg-black w-full ">
            <div className='p-4 sticky top-0 z-50 bg-black'>
                <div className="flex flex-row justify-around gap-8 items-center">
                    <Link to ='/preminum'>
                        <img src="https://w0.peakpx.com/wallpaper/601/350/HD-wallpaper-spotify-black-white.jpg"
                            alt='app-logo'
                            className='w-14 h-14 object-cover rounded-full cursor-pointer'
                        />
                        </Link>
                    <Link to='/home'>
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaiYgytQqMHFGONbKnszTrP-G_eeJeF4ne-Q&s'
                            alt='home-logo'
                            className='w-9 h-9 object-contain cursor-pointer'
                        />
                    </Link>
                        <input
                            type='search'
                            placeholder='What Do You Want To Play?'
                            onChange={handleInput}
                            value={searchInput}
                            className='border-white text-white w-full md:w-1/3 bg-[#1F1F1F] p-3 rounded-sm ml-auto'
                        />
                        <button
                            className='bg-white text-black font-semibold text-lg rounded-xl px-4 py-2 hover:scale-105 transition-all ml-auto flex self-end'
                            onClick={handleLogOut}>
                            Log out
                        </button>
                </div>
                <div>

                </div>
            </div>
             <div className='flex flex-col p-2 md:grid md:grid-cols-[1fr_2fr] gap-3 mr-2'>
        <Sidebar/>
        <Playlist searchInput={searchInput}/>
      </div>
      <Footer/>
        </nav>
    </div>
  )
}

export default Home
