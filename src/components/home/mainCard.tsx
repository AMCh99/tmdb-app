import React, { useEffect, useState, useRef } from 'react';
import { Movie } from '../../types/movie';
import { TrendingService } from '../../service/trending.service';
import { MovieDetailsCard } from '../movieDetailsCard';

interface Props {}

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function MainCard(props: Props) {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isCurrentMovie, setIsCurrentMovie] = useState<Movie | null>(null);
    const [counter, setCounter] = useState<number>(0);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
    const [isFading, setIsFading] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const data = await TrendingService.getTrendingAllToday();
            setTrending(data);
            setLoading(false);
        };
        getData();
    }, []);

    useInterval(
        () => {
            if (trending.length > 0) {
                setIsFading(true);
                setTimeout(async () => {
                    const details = await TrendingService.getDetails(
                        trending[counter]?.id,
                        trending[counter]?.media_type
                    );
                    setIsCurrentMovie(details);
                    setCounter((prevCounter) =>
                        prevCounter >= trending.length - 1 ? 0 : prevCounter + 1
                    );
                    setIsFading(false);
                }, 1000); // Corresponds to the fade-out duration
            }
        },
        !isVideoOn && !isFading ? 12000 : null
    );

    useEffect(() => {
        const setInitialMovie = async () => {
            if (trending.length > 0) {
                const details = await TrendingService.getDetails(
                    trending[0]?.id,
                    trending[0]?.media_type
                );
                setIsCurrentMovie(details);
                setCounter(1);
            }
        };
        setInitialMovie();
    }, [trending]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (isCurrentMovie != null) {
        return (
            <MovieDetailsCard
                movie={isCurrentMovie}
                setIsVideoOn={setIsVideoOn}
                isFading={isFading}
            />
        );
    }
    return null;
}
