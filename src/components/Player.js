import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
// import { playAudio } from '../util';

const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo,songInfo, setCurrentSong, songs, setSongs }) => {

    const activeLibraryHandler = (nextPrev) => {
        // // alternative version more compact
        // setSongs((prevSongs) => {
        //     return prevSongs.map((s) => ({
        //         ...s,
        //         active: s.id === nextPrev.id,
        //     }));
        // });

        // mapping all the songs and checks the one with the id clicked
        const newSongs = songs.map((song)=>{
            // quando trovo tra tutte le canzoni l'id corrispondente a quello cliccato, setto la chiave active come true, e con l'else setto gli altri come false
            if (song.id === nextPrev.id ) {
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
        // cambio lo state delle songs con la nuova configurazione fatta sopra
        setSongs(newSongs);
    }
    
    // event handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            
            setIsPlaying(!isPlaying);
            // equivale a questo sotto
            // setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
            // equivale a questo sotto
            // setIsPlaying(true);
        }
    }


    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        );
        // // alterntive version to convert second in minute and seconds
        // const minutes = Math.floor(time / 60);
        // const seconds = Math.floor(time % 60);
        // const secondsWithZero = String(seconds).padStart(2, "0");
        // return `${minutes}:${secondsWithZero}`;
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime:e.target.value});
    }
    const skiptrackHandler = async (direction) => {
        // estraggo l'indice della canzone selezionata, facendo una comparazione tra gli id di tutte le canzoni fino a quando non trovo la corrispondenza con l'id cliccato
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        // check, se ho cliccato sul pulsante avanti o indietro 
        if (direction === 'skip-forward') {
            // imposto l'indice delle canzone principale in base all'indice attuale aumentato di 1, e quando arrivo alla fine reimposto l'indice a 0 grazie alla metodo %; in pratica se l'indice arriva al massimo della lunghezza delle canzoni totali, il resto da 0 e lo reimposta l'indice a 0
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        } else if (direction === 'skip-back') {
            // nel caso mi trovi alla canzone iniziale che ha indice 0, l'indice andrebbe a -1 e non va bene, quindi reimposto l'indice della canzone principale uguale all'ultima della lista, facendo cosi apparire l'ultima canzone
            if ((currentIndex - 1) % songs.length === -1) {

                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if (isPlaying) {
                    audioRef.current.play();
                }
                // serve il return perché altrimenti andrebbe avanti la funzione
                return;
            }
            // nel caso non mi trovi alla conzone attuale, imposto l'indice della canzone principale sottraendolo di 1 e facendo visualizzare quindi la canzone precendente
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        // faccio iniziare la canzone successiva se quando skippo la canzone precedente questa è in riproduzione
        if (isPlaying) {
            audioRef.current.play();
        }
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    const inputAnim = {
        background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`
    }


    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={inputAnim} className="track">
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler} 
                        type="range"
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={ ()=> skiptrackHandler('skip-back') }
                    className='skip-back' 
                    size='2x' 
                    icon={ faAngleLeft } 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler}
                    className='play' 
                    size='2x' 
                    icon={ isPlaying ? faPause : faPlay} 
                />
                <FontAwesomeIcon 
                    onClick={ ()=> skiptrackHandler('skip-forward') }
                    className='skip-forward' 
                    size='2x' 
                    icon={ faAngleRight } 
                />
            </div>
        </div>
    );
};

export default Player;