import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/movie';
import { TrendingService } from '../../service/trending.service';
import { MovieDetailsCard } from '../movieDetailsCard';

interface Props {}

export default function MainCard(props: Props) {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isCurrentMovie, setIsCurrentMovie] = useState<Movie | null>(null);
    const [counter, setCounter] = useState<number>(0);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const data = await TrendingService.getTrendingAllToday();
            setTrending(data);
            setLoading(false);

            const details = await TrendingService.getDetails(
                data[0]?.id,
                data[0]?.media_type
            );
            setIsCurrentMovie(details);
        };
        getData();
    }, []);

    useEffect(() => {
        if (!isVideoOn && isCurrentMovie) {
            setTimeout(async () => {
                const details = await TrendingService.getDetails(
                    trending[counter]?.id,
                    trending[counter]?.media_type
                );
                setIsCurrentMovie(details);
                counter >= trending.length - 1
                    ? setCounter(0)
                    : setCounter(counter + 1);
            }, 12000);
        }
    });

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (isCurrentMovie != null) {
        return (
            <MovieDetailsCard
                movie={isCurrentMovie}
                setIsVideoOn={setIsVideoOn}
            />
        );
    }
}
