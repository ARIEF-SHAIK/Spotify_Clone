import { createContext, useContext, useEffect, useState } from 'react';

const CustomPlaylistContext = createContext();

export const CustomPlaylistProvider = ({ children }) => {
  const [customPlaylists, setCustomPlaylists] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('customPlaylists');
    if (saved) {
      setCustomPlaylists(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customPlaylists', JSON.stringify(customPlaylists));
  }, [customPlaylists]);

  const addToPlaylist = (playlistName, song) => {
    setCustomPlaylists(prev => ({
      ...prev,
      [playlistName]: prev[playlistName]
        ? [...prev[playlistName], song]
        : [song],
    }));
  };

  const createPlaylist = (playlistName) => {
    if (!customPlaylists[playlistName]) {
      setCustomPlaylists(prev => ({ ...prev, [playlistName]: [] }));
    }
  };

  return (
    <CustomPlaylistContext.Provider value={{ customPlaylists, addToPlaylist, createPlaylist }}>
      {children}
    </CustomPlaylistContext.Provider>
  );
};

export const useCustomPlaylists = () => useContext(CustomPlaylistContext);
