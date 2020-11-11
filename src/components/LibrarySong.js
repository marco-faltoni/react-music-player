import React from 'react';
// import { playAudio } from '../util';

const LibrarySong = ({song, songs, setCurrentSong, audioRef, isPlaying, id, setSongs }) => {
    const songSelectHandler = async () => {
        // aggiorno l'interfaccia principale con la canzone cliccata
        await setCurrentSong(song);

        // mapping all the songs and checks the one with the id clicked
        const newSongs = songs.map((song)=>{
            // quando trovo tra tutte le canzoni l'id corrispondente a quello cliccato, setto la chiave active come true, e con l'else setto gli altri come false
            if (song.id === id ) {
                return{
                    ...song,
                    active: true,
                }
            } else {
                return{
                    ...song,
                    active: false,
                }
            }
        });
        // faccio iniziare la canzone successiva se quando skippo la canzone precedente questa è in riproduzione
        if (isPlaying) {
            audioRef.current.play();
        }
        // cambio lo state delle songs con la nuova configurazione fatta sopra
        setSongs(newSongs);
        
    }
    return (
        <div onClick={songSelectHandler} className= {`library-song ${song.active ? 'selected' : ""} `}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;