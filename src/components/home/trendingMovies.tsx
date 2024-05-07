import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/movie';
import { Box, Typography } from '@mui/material';
import { TrendingService } from '../../service/trending.service';
import { TrendingScrollBar } from './trendingScrollableBar';

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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ margin: 'auto' }}>
                <Typography variant="h6" sx={{ marginLeft: '75px' }}>
                    Trending Movies
                </Typography>
                <TrendingScrollBar
                    moviesShowData={trendingMoviesData}
                    id={'trending_movies'}
                />
            </Box>
        </Box>
    );
}
