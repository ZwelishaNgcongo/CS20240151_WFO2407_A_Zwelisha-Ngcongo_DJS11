import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchShow } from '../utils/api';
import SeasonDetail from './SeasonDetail';

const ShowDetail = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getShow = async () => {
            const data = await fetchShow(id);
            setShow(data);
            setLoading(false);
        };
        getShow();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>{show.title}</h1>
            <p>{show.description}</p>
            <img src={show.image} alt={show.title} />
            <h2>Seasons</h2>
            {show.seasons.map((season) => (
                <SeasonDetail key={season.id} season={season} />
            ))}
            <Link to="/">Back to Shows</Link>
        </div>
    );
};

export default ShowDetail;