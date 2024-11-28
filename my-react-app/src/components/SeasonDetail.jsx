import { useState } from 'react';
import PropTypes from 'prop-types';
import EpisodePlayer from './EpisodePlayer';

const SeasonDetail = ({ season }) => {
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    return (
        <div>
            <h3>{season.title}</h3>
            <img src={season.image} alt={season.title} />
            <p>Episodes: {season.episodes.length}</p>
            <ul>
                {season.episodes.map((episode) => (
                    <li key={episode.id}>
                        <button onClick={() => setSelectedEpisode(episode)}>
                            {episode.title}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedEpisode && (
                <EpisodePlayer
                    episode={selectedEpisode}
                    onClose={() => setSelectedEpisode(null)}
                />
            )}
        </div>
    );
};

SeasonDetail.propTypes = {
    season: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        episodes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                title: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

export default SeasonDetail;