import { Movie } from '../types/movie';
import { Box, Typography } from '@mui/material';
import { TrendingScrollBar } from './trendingScrollableBar';
import { useMovieList } from '../hooks/useMovieList';

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
    const { data: movieTvData = [], isLoading } = useMovieList(props.media_type, props.listType);

    if (isLoading) {
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
