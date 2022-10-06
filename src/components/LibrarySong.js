import React from 'react';
import {playAudio} from '../util'

const LibrarySong = ({ setSongs, isPlaying, audioRef, song, setCurrentSong, songs }) => {

    const selectSongHandler = () => {
        
        setCurrentSong(song)
        // console.log(songs.map((siema)=> {return {...siema, active: siema.id === song.id}}))
        setSongs( 
            songs.map((targetSong) => {
                return {
                  ...targetSong,
                  active: targetSong.id === song.id
                }
              }
            )
        )

        playAudio(isPlaying, audioRef)
        
    };

    return(
        <div onClick={selectSongHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong