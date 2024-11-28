import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const EpisodePlayer = ({ episode, onClose }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = progress;
        }
    }, [progress]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    return (
        <div className="episode-player">
            <h2>Now Playing: {episode.title}</h2>
            <audio
                ref={audioRef}
                src={episode.file}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            />
            <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={onClose}>Close Player</button>
            <div>
                <progress 
                    value={progress} 
                    max={audioRef.current ? audioRef.current.duration : 0} 
                />
            </div>
        </div>
    );
};

EpisodePlayer.propTypes = {
    episode: PropTypes.shape({
        title: PropTypes.string.isRequired,
        file: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

export default EpisodePlayer;