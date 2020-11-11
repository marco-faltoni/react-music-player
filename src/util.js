export const playAudio = (isPlaying, audioRef) => {
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