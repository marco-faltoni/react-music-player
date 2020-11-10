import React from 'react';

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying }) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        // check if the previous song is playing
        if (isPlaying) {
            // if it's true then play next song
            const playPromise = audioRef.current.play();
            
            // wait until the song is loaded up
            if (playPromise !== undefined) {
                playPromise.then((audio) =>{
                    audioRef.current.play();
                })
            }
        }
    }
    return (
        <div onClick={songSelectHandler} className="library-song">
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;