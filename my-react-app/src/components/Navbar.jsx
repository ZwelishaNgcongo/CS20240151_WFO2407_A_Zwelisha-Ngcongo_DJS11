// src/components/Navbar.jsx

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🎙️ Podcast App</Link>
      <ul className="navbar-links">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/favorites" className="navbar-link">Favorites</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;