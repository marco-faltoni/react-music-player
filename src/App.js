import React, {useState, useRef} from 'react';

// import styles
import "./style/app.scss";

// Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

// import data songs
import data from './data';


function App() {
    // ref
    const audioRef = useRef(null);

    // state
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
    })
    const [libraryStatus, setLibraryStatus] = useState(false);

    const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;

      // semplifico in numeri interi il tempo corrente e la durata della canzone
      const roundedCurrent = Math.round(current);
      const roundedDuration = Math.round(duration);
      // divido le due variabili sopra per ottenere un numero percentuale
      const animationTotal = Math.round((roundedCurrent / roundedDuration) * 100);
      // console.log(animationTotal);

      setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animationTotal });
    }
    
    const songsEndHandler = async () => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      // imposto l'indice delle canzone principale in base all'indice attuale aumentato di 1, e quando arrivo alla fine reimposto l'indice a 0 grazie alla metodo %; in pratica se l'indice arriva al massimo della lunghezza delle canzoni totali, il resto da 0 e lo reimposta l'indice a 0
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
    
    

    return (
      <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
        {/* <h1>A Very Funny Music Player</h1> */}
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Song currentSong={currentSong} />
        <Player 
          audioRef={audioRef} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          currentSong={currentSong}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
        <Library
          audioRef={audioRef}
          songs={songs} 
          currentSong={currentSong} 
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
        />
        <audio 
          onTimeUpdate={timeUpdateHandler} 
          onLoadedMetadata={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio} 
          onEnded={songsEndHandler}
        ></audio>
      </div>
    );
}

export default App;
