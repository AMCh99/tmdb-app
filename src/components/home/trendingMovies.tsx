import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/movie';
import { Box, Container, Grid, Typography } from '@mui/material';
import { MovieCard } from './movieCard';
import { ScrollableCardContent } from '../../utils/theme/custom-components';
import { TrendingService } from '../../service/trending.service';

export default function TrendingMovies() {
    const [trendingMoviesData, setTrendingMoviesData] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            const data = await TrendingService.getTrendingMovies();

            setTrendingMoviesData(data);
            setLoading(false);
        };
        getData();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <Typography variant="h6">Trending Movies</Typography>
            <ScrollableCardContent>
                <Grid
                    sx={{
                        display: 'flex',
                        scrollSnapType: 'x mandatory',
                        scrollSnapAlignl: 'center',
                        gap: '15px'
                    }}
                >
                    {/* <MovieCard movie={trendingMoviesData[0]} /> */}
                    {trendingMoviesData?.map((movie) => {
                        return (
                            <MovieCard
                                movie={movie}
                                key={movie.id + 'mov_card'}
                            />
                        );
                    })}
                </Grid>
            </ScrollableCardContent>
        </>
    );
}
