import React, { useEffect, useState } from 'react';
import { TrendingService } from '../../service/trending.service';
import { Movie } from '../../types/movie';
import { Box, Container, Grid, Typography } from '@mui/material';
import { MovieCard } from './movieCard';
import { ScrollableCardContent } from '../../utils/theme/custom-components';
import { useQueries } from 'react-query';

export default function TrendingTvSeries() {
    const [trendingTvSeriesData, setTrendingTvSeriesData] = useState<Movie[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            const data = await TrendingService.getTrendingTvShows();

            setTrendingTvSeriesData(data);
            setLoading(false);
        };
        getData();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    console.log(trendingTvSeriesData);

    return (
        <>
            <Typography variant="h6">Trending Series</Typography>
            <ScrollableCardContent>
                <Grid
                    sx={{
                        display: 'flex',
                        scrollSnapType: 'x mandatory',
                        scrollSnapAlignl: 'center',
                        gap: '15px'
                    }}
                >
                    {/* <MovieCard movie={trendingTvSeriesData[0]} /> */}
                    {trendingTvSeriesData?.map((movie) => {
                        return (
                            <MovieCard
                                key={movie.id + 'tv_card'}
                                movie={movie}
                            />
                        );
                    })}
                </Grid>
            </ScrollableCardContent>
        </>
    );
}
