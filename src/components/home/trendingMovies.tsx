import React from 'react';
import { Box, Typography } from '@mui/material';
import { TrendingScrollBar } from '../trendingScrollableBar';
import { useTrendingMovies } from '../../hooks/useTrendingMovies';

export default function TrendingMovies() {
    const { data: trendingMoviesData = [], isLoading } = useTrendingMovies();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ margin: 'auto' }}>
                <Typography variant='h6' sx={{ marginLeft: '75px' }}>
                    Trending Movies
                </Typography>
                <TrendingScrollBar
                    moviesShowData={trendingMoviesData}
                    id={'trending_movies'}
                    media_type={'movie'}
                />
            </Box>
        </Box>
    );
}
