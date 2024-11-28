import  { useEffect, useState } from 'react';
import { fetchPreviews } from '../utils/api';
import { Link } from 'react-router-dom';
import GenreFilter from './GenreFilter';

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredShows, setFilteredShows] = useState([]);

    useEffect(() => {
        const getShows = async () => {
            const data = await fetchPreviews();
            setShows(data);
            setFilteredShows(data);
            setLoading(false);
        };
        getShows();
    }, []);

    const handleFilter = (genre) => {
        if (genre) {
            setFilteredShows(shows.filter(show => show.genres.includes(genre)));
        } else {
            setFilteredShows(shows);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <GenreFilter onFilter={handleFilter} />
            {filteredShows.sort((a, b) => a.title.localeCompare(b.title)).map((show) => (
                <div key={show.id}>
                    <Link to={`/shows/${show.id}`}>
                        <h2>{show.title}</h2>
                        <img src={show.image} alt={show.title} />
                    </Link>
                    <p>{show.description}</p>
                    <p>Seasons: {show.seasons.length}</p>
                    <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default ShowList;