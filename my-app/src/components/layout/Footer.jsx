// Footer.jsx
const Footer = ({ genreData }) => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Now Playing</h3>
            <div id="audio-player-container" className="audio-player-footer">
              {/* Audio player will be rendered here */}
            </div>
          </div>
  
          <div className="footer-section">
            <h3>Genres</h3>
            <div className="genre-list">
              {Object.entries(genreData).map(([id, title]) => (
                <span key={id} className="genre-tag">
                  {title}
                </span>
              ))}
            </div>
          </div>
  
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} PodcastHub</p>
          </div>
        </div>
      </footer>
    );
  };
  export { Footer };