import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { Box, Typography } from '@mui/material';
import { TrendingService } from '../service/trending.service';
import { TrendingScrollBar } from './trendingScrollableBar';

interface Props {
    readonly media_type: 'movie' | 'tv';
    readonly listType: 'upcoming' | 'airing_today' | 'top_rated';
}

const titleDictionary = {
    upcoming: 'Upcoming',
    airing_today: 'Airing today',
    top_rated: 'Top Rated'
};

export function MovieTvList(props: Props) {
    const [movieTvData, setMovieTvData] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            const data = await TrendingService.getLists(
                props.media_type,
                props.listType
            );

            setMovieTvData(data);
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
                    {titleDictionary[props.listType]}{' '}
                    {props.media_type == 'movie' ? 'Movies' : 'Tv Shows'}
                </Typography>
                <TrendingScrollBar
                    moviesShowData={movieTvData}
                    id={`${props.listType}_${props.media_type}`}
                    media_type={props.media_type}
                />
            </Box>
        </Box>
    );
}
