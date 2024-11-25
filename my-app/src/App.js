import React, { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AudioProvider } from "./components/context/AudioContext.jsx";
import { FavoritesProvider } from "./components/context/FavoritesContext.jsx";
import AudioPlayer from "./components/audio/AudioPlayer.jsx";
import Favorites from "./components/favorites/FavoriteCard.jsx";

import { Layout } from "./components/layout/Layout.jsx";
import { api } from "./services/api";
import { sortByTitle } from "./constants";

function App() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getShows()
      .then((data) => setShows(data.sort(sortByTitle))) // Now you can use sortByTitle
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      {/*  <Router>
      <AudioProvider>
        <FavoritesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<ShowList shows={shows} />} />
              <Route path="/show/:id" element={<ShowDetail />} />
              <Route path="/favorites" element={<FavoritesList />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </AudioProvider>
    </Router> */}
    </Layout>
  );
}

export default App;
