import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const genreData = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

const Header = ({ onSortChange, onGenreSelect }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSortChange = (sortType) => {
    if (onSortChange) {
      onSortChange(sortType);
    }
  };

  const handleGenreSelect = (genreId) => {
    if (onGenreSelect) {
      onGenreSelect(genreId);
    }
  };

  return (
    <header className="header">
      <nav className=/* "nav-container" */"headerNav">
        <div className="nav-left">
          <Link to="/" className="logo">
            PodcastHub
          </Link>
        </div>

        <div className="nav-center">
          <div className="sort-options">
            <select 
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="a-z">Title A-Z</option>
              <option value="z-a">Title Z-A</option>
              <option value="newest">Newest Updated</option>
              <option value="oldest">Oldest Updated</option>
            </select>
          </div>

          <div className="genre-filter">
            <select 
              onChange={(e) => handleGenreSelect(e.target.value)}
              className="genre-select"
            >
              <option value="">All Genres</option>
              {Object.entries(genreData).map(([id, title]) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="nav-right">
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your listening history?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="reset-button"
          >
            Reset History
          </button>
          <button 
            className="mobile-menu-button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            Menu
          </button>
        </div>

        {showMobileMenu && (
          <div className="mobile-menu">
            <Link to="/" className="mobile-link">Shows</Link>
            <Link to="/favorites" className="mobile-link">Favorites</Link>
            <div className="mobile-sort">
              <label>Sort:</label>
              <button onClick={() => handleSortChange('a-z')}>A-Z</button>
              <button onClick={() => handleSortChange('z-a')}>Z-A</button>
              <button onClick={() => handleSortChange('newest')}>Newest</button>
              <button onClick={() => handleSortChange('oldest')}>Oldest</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export{Header}