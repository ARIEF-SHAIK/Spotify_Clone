
import React from 'react';
import { useCustomPlaylists } from '../UseContext/CustomPlaylists';
import { Link } from 'react-router-dom';

const MyPlaylists = () => {
  const { customPlaylists, addToPlaylist, createPlaylist } = useCustomPlaylists();

  const handleDeletePlaylist = (name) => {
    const updated = { ...customPlaylists };
    delete updated[name];
    localStorage.setItem('customPlaylists', JSON.stringify(updated));
    window.location.reload(); // refresh after delete
  };

  const handleDeleteSong = (playlistName, songId) => {
    const updated = {
      ...customPlaylists,
      [playlistName]: customPlaylists[playlistName].filter(song => song.id !== songId),
    };
    localStorage.setItem('customPlaylists', JSON.stringify(updated));
    window.location.reload(); // refresh after delete
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
        <Link to="/home">
    <button className="bg-white text-black rounded-full p-1 font-bold p-2  hover:bg-green-500 cursor-pointer">Back To Home </button>
    </Link>
      <h1 className="text-3xl font-bold text-white mb-8 text-center">🎸 My Custom Playlists</h1>
    {Object.keys(customPlaylists).length === 0 ? (
        <p className="text-gray-400 text-center m-4">No playlists created yet🤷‍♀️</p>
      ) : (
        Object.entries(customPlaylists).map(([playlistName, songs]) => (
          <div key={playlistName} className="mb-10 bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold">{playlistName}</h2>
              <button
                onClick={() => handleDeletePlaylist(playlistName)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
              >
                Delete Playlist 🗑️
              </button>
            </div>

            {songs.length === 0 ? (
              <p className="text-gray-400">No songs added yet</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {songs.map((song) => (
                  <div
                    key={song.id}
                    className="bg-black p-4 rounded-xl shadow-md hover:bg-gray-900 transition">
                    <h3 className="font-semibold text-lg truncate">{song.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{song.artists}</p>

                    {song.preview_url ? (
                      <audio controls className="w-full mb-2">
                        <source src={song.preview_url} type="audio/mpeg" />
                        Your browser does not support audio.
                      </audio>
                    ) : (
                      <p className="text-xs text-gray-500 mb-2">No preview available</p>
                    )}

                    <a
                      href={song.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 text-sm underline block mb-2"
                    >
                      Open in Spotify ↗
                    </a>

                    <button
                      onClick={() => handleDeleteSong(playlistName, song.id)}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      Remove from playlist ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyPlaylists;
