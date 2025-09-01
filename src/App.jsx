import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/LoginPage/login'
import Home from './components/Home/home.jsx' 
import Preminum from './components/Preminum/preminum.jsx'
import Footer from './components/Footer/footer.jsx'
import Playlist from './components/playlistpage/playlist.jsx'
import PlayListDetails from './components/PlayListDetails/PlayListDetails.jsx'
import { PaginationContextProvider } from './components/UseContext/pagenation.jsx'
import { LikedSongsProvider } from './components/UseContext/LikedSongs.jsx';
import { CustomPlaylistProvider } from './components/UseContext/CustomPlaylists.jsx'
import LikedSongsPage from './components/LikedSongsPage/LikedSongsPage.jsx'
import Genres from './components/GenresPage/Genres.jsx'
import GenresDetails from './components/GenresDeatils/GenresDeatils.jsx'
import NewReleasePage from './components/NewReleasePage/NewRelease.jsx'
import MyPlaylists from './components/YourPlaylists/YourPlaylists.jsx';


function App() {
  return (
    <PaginationContextProvider>
      <LikedSongsProvider>
        <CustomPlaylistProvider>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/preminum' element={<Preminum/>}/> 
            <Route path ='/footer' element={<Footer/>}/>
            <Route path='/playlist' element={<Playlist/>}/>
            <Route path='/playlist/:playlistId' element={<PlayListDetails/>}/>
            <Route path='/BrowseGenres' element={<Genres/>}/>
          <Route path='/genres/:genreId' element={<GenresDetails/>}/>
          <Route path='/LikedSongsPage' element={<LikedSongsPage/>}/>
          <Route path='/GenresPage' element={<Genres/>}/>
          <Route path='/newreleases' element={<NewReleasePage/>}/>
          <Route path='/YourPlaylists' element={<MyPlaylists/>}/>


          </Routes>
        </CustomPlaylistProvider>
      </LikedSongsProvider>
    </PaginationContextProvider>
  )
}

export default App