import {React, useState, useRef} from 'react';
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'
import Nav from './components/Nav'
import './styles/app.scss'
import data from './data'

function App() {
  //State
  const [isPlaying, setIsPlaying] = useState(false)
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [libraryStatus, setLibraryStatus] = useState(false);
  // state z player
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  // ref
  const audioRef = useRef(null)

  //event listeners
  const timeUpdateHandler = (e) => {

    // console.log(e.target)
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo,
        currentTime: current,
        duration: duration
    })
  }


  return (
    <div className="App">
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />

      <Song 
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong}>
      </Song>
      <Player 
        setSongs={setSongs}
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        >
      </Player>
      <audio 
        onLoadedMetadata={timeUpdateHandler} //po wczytaniu audio rob funkcje
        onTimeUpdate={timeUpdateHandler} //po aktualizacji czasu muzyki
        ref={audioRef} 
        src={currentSong.audio}>
      </audio>
    </div>
  );
}

export default App;
