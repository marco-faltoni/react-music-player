import React, {useState, useRef} from 'react';

// import styles
import "./style/app.scss";

// Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';

// import data songs
import data from './util';


function App() {
    // ref
    const audioRef = useRef(null);

    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      setSongInfo({...songInfo, currentTime: current, duration: duration});
    }

    // state
    const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
    })

    return (
      <div className="App">
        {/* <h1>A Very Funny Music Player</h1> */}
        <Song currentSong={currentSong} />
        <Player 
          audioRef={audioRef} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          currentSong={currentSong}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
        />
        <Library
          audioRef={audioRef}
          songs={songs} 
          currentSong={currentSong} 
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
        />
        <audio 
          onTimeUpdate={timeUpdateHandler} 
          onLoadedMetadata={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio} 
        ></audio>
      </div>
    );
}

export default App;
