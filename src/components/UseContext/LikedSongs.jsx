import { createContext, useContext, useEffect, useState } from 'react';

const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem('likedSongs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  const addToLiked = (song) => {
    const alreadyExists = likedSongs.some((s) => s.id === song.id);
    if (!alreadyExists) {
      setLikedSongs((prev) => [...prev, song]);
    }
  };

  const removeFromLiked = (id) => {
    setLikedSongs((prev) => prev.filter((song) => song.id !== id));
  };

  return (
    <LikedSongsContext.Provider value={{ likedSongs, addToLiked, removeFromLiked }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => useContext(LikedSongsContext);