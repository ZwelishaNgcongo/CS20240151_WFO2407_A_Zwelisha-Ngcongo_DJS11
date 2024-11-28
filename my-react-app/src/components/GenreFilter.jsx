import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchGenres } from '../utils/api'; // Assume this API fetches genres

const GenreFilter = ({ onFilter }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        const getGenres = async () => {
            const data = await fetchGenres(); // Fetch genres from your API
            setGenres(data);
        };
        getGenres();
    }, []);

    const handleChange = (e) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
        onFilter(genre);
    };

    return (
        <div>
            <label htmlFor="genre-select">Filter by Genre:</label>
            <select id="genre-select" value={selectedGenre} onChange={handleChange}>
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

GenreFilter.propTypes = {
    onFilter: PropTypes.func.isRequired
};

export default GenreFilter;