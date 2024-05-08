import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NavBar } from '../../components/navbar';
import { Movie } from '../../types/movie';
import { TrendingService } from '../../service/trending.service';
import { MovieDetailsCard } from '../../components/movieDetailsCard';
import { Container } from '@mui/material';

interface RouteParams {
    movie_id: string;
    media_type: string;
}

export default function MoviePage() {
    const router = useRouter();
    const { movie_id, media_type } = router.query;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);

    useEffect(() => {
        if (typeof movie_id === 'string' && typeof media_type === 'string') {
            const getData = async () => {
                const details = await TrendingService.getDetails(
                    parseInt(movie_id),
                    media_type
                );
                setMovie(details);
            };
            getData();
        }
    }, [movie_id, media_type]);

    console.log(movie);

    if (movie != null)
        return (
            <>
                <NavBar />
                <MovieDetailsCard movie={movie} setIsVideoOn={setIsVideoOn} />
            </>
        );
}
