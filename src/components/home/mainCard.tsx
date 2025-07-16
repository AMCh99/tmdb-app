import { useEffect, useState } from 'react';
import { Movie } from '../../types/movie';
import { MovieDetailsCard } from '../movieDetailsCard';
import { useTrendingAllToday } from '../../hooks/useTrendingAllToday';
import { useMovieDetails } from '../../hooks/useMovieDetails';

interface Props {}

export default function MainCard(props: Props) {
    const { data: trending = [], isLoading } = useTrendingAllToday();
    const [counter, setCounter] = useState<number>(0);
    const [isCurrentMovie, setIsCurrentMovie] = useState<Movie | null>(null);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
    const [isFading, setIsFading] = useState<boolean>(false);

    const currentTrendingMovie = trending[counter] || trending[0];
    const { data: details } = useMovieDetails(currentTrendingMovie?.id, currentTrendingMovie?.media_type);

    useEffect(() => {
        if (details) {
            setIsCurrentMovie(details);
        }
    }, [details]);

    useEffect(() => {
        if (trending.length > 0) {
            setCounter(0);
        }
    }, [trending]);

    useEffect(() => {
        if (!isVideoOn && !isFading && trending.length > 0) {
            const interval = setInterval(() => {
                setIsFading(true);
                setTimeout(() => {
                    setCounter((prevCounter) =>
                        prevCounter >= trending.length - 1 ? 0 : prevCounter + 1
                    );
                    setIsFading(false);
                }, 1000);
            }, 12000);
            return () => clearInterval(interval);
        }
    }, [isVideoOn, isFading, trending.length]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!isCurrentMovie) {
        return null;
    }

    return (
        <MovieDetailsCard
            movie={isCurrentMovie}
            setIsVideoOn={setIsVideoOn}
            isFading={isFading}
        />
    );
}
