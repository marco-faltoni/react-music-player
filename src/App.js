import React, {useState} from 'react';

// import styles
import "./style/app.scss";

// Adding components
import Player from './components/Player';
import Song from './components/Song';

// import data songs
import data from './util';


function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    return (
      <div className="App">
        {/* <h1>A Very Funny Music Player</h1> */}
        <Song currentSong={currentSong} />
        <Player />
      </div>
    );
}

export default App;
