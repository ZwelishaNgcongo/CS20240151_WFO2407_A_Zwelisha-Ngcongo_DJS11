// src/components/Header.js

import { Link } from 'react-router-dom';
/* import './Header.css'; */ // Import CSS for styling

const Header = () => {
    return (
        <header className="header">
            <h1 className="logo">Podcast App</h1>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;