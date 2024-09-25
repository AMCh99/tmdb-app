import { useEffect, useState } from 'react';
import { TrendingService } from '../../service/trending.service';
import { Movie } from '../../types/movie';
import { Box, Typography } from '@mui/material';
import { TrendingScrollBar } from '../trendingScrollableBar';

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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ margin: 'auto' }}>
                <Typography variant='h6' sx={{ marginLeft: '75px' }}>
                    Trending Series
                </Typography>
                <TrendingScrollBar
                    moviesShowData={trendingTvSeriesData}
                    id={'trending_series'}
                    media_type='tv'
                />
            </Box>
        </Box>
    );
}
