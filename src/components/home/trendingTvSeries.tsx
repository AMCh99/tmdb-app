import { Box, Typography } from '@mui/material';
import { TrendingScrollBar } from '../trendingScrollableBar';
import { useTrendingTvShows } from '../../hooks/useTrendingTvShows';

export default function TrendingTvSeries() {
    const { data: trendingTvSeriesData = [], isLoading } = useTrendingTvShows();

    if (isLoading) {
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
