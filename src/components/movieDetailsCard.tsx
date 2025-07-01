import {
    Box,
    Container,
    Typography,
    Grid,
    Rating,
    IconButton
} from '@mui/material';
import ReactPlayer from 'react-player';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Movie } from '../types/movie';
import { useEffect, useState } from 'react';

interface Props {
    readonly movie: Movie;
    readonly setIsVideoOn: Function;
    readonly isFading: boolean;
}

export function MovieDetailsCard(props: Props) {
    const { movie, setIsVideoOn, isFading } = props;
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (isFading) {
            setOpacity(0);
        } else {
            const timer = setTimeout(() => setOpacity(1), 100); // Small delay to ensure transition triggers
            return () => clearTimeout(timer);
        }
    }, [isFading, movie?.backdrop_path]);

    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.0), rgba(18, 18, 18, 1) 98%),url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
                opacity: opacity,
                transition: 'opacity 1s ease-in-out',
                height: '85vh',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                willChange: 'opacity'
            }}
        >
            <Box sx={{ ml: 4, mr: 4 }}>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <Container
                            sx={{
                                height: '100vh',
                                width: '100%',
                                justifyContent: 'flex-end',
                                alignContent: 'center'
                            }}
                        >
                            {movie?.trailer && (
                                <ReactPlayer
                                    url={`https://www.youtube.com/embed/${movie?.trailer[0]?.key}`}
                                    width='70%'
                                    height='40%'
                                    onPlay={() => {
                                        setIsVideoOn(true);
                                    }}
                                    onPause={() => {
                                        setIsVideoOn(false);
                                    }}
                                    onEnded={() => {
                                        setIsVideoOn(false);
                                    }}
                                />
                            )}
                            <Typography variant='body1' sx={{ width: '70%' }}>
                                {movie?.overview}
                            </Typography>
                        </Container>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{}}>
                        <Container
                            sx={{
                                height: '100vh',
                                justifyContent: 'flex-end',
                                alignContent: 'center'
                            }}
                        >
                            <Typography
                                variant='h2'
                                align='right'
                                sx={{
                                    fontWeight: '500',
                                    textShadow: 'rgb(106, 166, 177) 2px 2px 2px'
                                }}
                            >
                                {movie?.title ?? movie?.name}
                            </Typography>
                            <Typography variant='h6' align='right'>
                                {movie?.release_date ?? movie?.first_air_date} /{' '}
                                {movie?.original_title ??
                                    movie?.original_language}
                            </Typography>
                            <Typography align='right'>
                                {movie?.genres &&
                                    movie?.genres.map((genre, index) => (
                                        <>
                                            <span key={index}>
                                                {genre.name}
                                            </span>
                                            {index !==
                                                movie?.genres?.length - 1 && (
                                                <span> / </span>
                                            )}
                                        </>
                                    ))}
                            </Typography>
                            <Typography
                                align='right'
                                sx={{
                                    display: 'flex',
                                    width: 'min-content',
                                    float: 'right'
                                }}
                            >
                                <IconButton>
                                    <WatchLaterIcon />
                                </IconButton>
                                <Rating
                                    name='read-only'
                                    sx={{ alignSelf: 'center' }}
                                    value={(movie?.vote_average ?? 0) / 2}
                                    readOnly
                                    precision={0.1}
                                />
                            </Typography>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
