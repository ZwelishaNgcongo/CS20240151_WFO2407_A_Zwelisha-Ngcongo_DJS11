
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header'; // Import your Header component
import ShowList from './components/ShowList'; // Import ShowList component
import ShowDetail from './components/ShowDetail'; // Import ShowDetail component
import Favorites from './components/Favorites'; // Import Favorites component
import LoadingIndicator from './components/LoadingIndicator'; // Import LoadingIndicator component
import GenreFilter from './components/GenreFilter'; // Import GenreFilter component
import { FavoritesProvider } from './context/FavoritesContext'; // Import Favorites context provider
/* import './styles.css'; // Import global styles */

import './App.css'

const App = () => {
  return (
      <FavoritesProvider>
          <Router>
              <div className="container">
                  <Header />
                  <GenreFilter /> {/* Optional: Place it here to filter shows globally */}
                  <Switch>
                      <Route exact path="/" component={ShowList} />
                      <Route path="/shows/:id" component={ShowDetail} />
                      <Route path="/favorites" component={Favorites} />
                      <Route path="/loading" component={LoadingIndicator} /> {/* Optional loading route */}
                      <Route path="*">
                          <div>404 Not Found</div> {/* Handle unmatched routes */}
                      </Route>
                  </Switch>
              </div>
          </Router>
      </FavoritesProvider>
  );
};

export default App;