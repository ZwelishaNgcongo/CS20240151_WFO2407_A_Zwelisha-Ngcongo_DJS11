
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>Podcast App</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;