import { React, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {playAudio} from '../util'

const Player = ({setSongs, songs, setSongInfo, songInfo, audioRef, currentSong, isPlaying, setIsPlaying, setCurrentSong}) => {
    //useEffect
    useEffect(() => {
        setSongs(
            songs.map( el => {
                return({
                    ...el,
                    active: el.id === currentSong.id
                })
            })
        );
    }, [currentSong])

    const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;
    //event handlers
    const getTime = (time) => {
        return(
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const songHandler = () => {
        console.log()
        if (isPlaying){
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const dragHandler = (e) => {
        setSongInfo({...songInfo, current: e.target.value })
        audioRef.current.currentTime = e.target.value
    }

    const skipTrackHandler = (direction) => {
        
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if (direction == 'skip-forward'){
            // setCurrentSong(songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1])
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
        if (direction == 'skip-back'){
            // setCurrentSong(songs[currentIndex - 1 < 0 ? songs.length -1 : currentIndex - 1])
            setCurrentSong(songs[((currentIndex - 1) % songs.length) < 0 ? songs.length -1 : currentIndex - 1])
        } 
        playAudio(isPlaying, audioRef)
    }
    return (
        
            <div className="player">

                <div className="time-control">
                    <p>{getTime(songInfo.currentTime)}</p>
                    <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                        <input
                        type="range"
                        value={songInfo.currentTime }
                        min={0}
                        max={songInfo.duration}
                        onChange={dragHandler}
                        />
                        <div 
                        style={{
                            transform: `translateX(${animationPercentage}%)`
                        }} 
                        className='animate-track'>
                            
                        </div>
                    </div>
                    <p>{getTime(songInfo.duration || 0) }</p>

                </div>
                <div className="play-control">
                    <FontAwesomeIcon 
                    onClick={() => skipTrackHandler("skip-back")}
                    className="skip-back" 
                    icon={faAngleLeft} />
                    <FontAwesomeIcon
                     className="play" 
                     size="2x" 
                     onClick ={songHandler}
                     icon={ isPlaying ? faPause : faPlay} 
                     />
                    <FontAwesomeIcon 
                     className="skip-forward"
                     icon={faAngleRight}
                     onClick={() => skipTrackHandler("skip-forward")}
                     />
                </div>
                
            </div>
    )
}

export default Player;