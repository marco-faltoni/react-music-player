// import styles
import "./style/app.scss";

// Adding components
import Player from './components/Player';
import Song from './components/Song';

// import data songs
import data from './util';


function App() {
    return (
      <div className="App">
        {/* <h1>A Very Funny Music Player</h1> */}
        <Song />
        <Player />
      </div>
    );
}

export default App;
