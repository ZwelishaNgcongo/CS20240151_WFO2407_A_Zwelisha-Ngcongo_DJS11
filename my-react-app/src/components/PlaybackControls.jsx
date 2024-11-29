

import PropTypes from 'prop-types';
const PlaybackControls = ({ audioRef }) => {
  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleForward = () => {
    audioRef.current.currentTime += 10;
  };

  return (
    <div className="playback-controls-container">
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleRewind}>Rewind 10s</button>
      <button onClick={handleForward}>Forward 10s</button>
    </div>
  );
};

/* Prop validation */
PlaybackControls.propTypes = {
  audioRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLAudioElement), /* Validate that current is an instance of HTMLAudioElement */
  }).isRequired, /* Validate that audioRef is required */
};

export default PlaybackControls;