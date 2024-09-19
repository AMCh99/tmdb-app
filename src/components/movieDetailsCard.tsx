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
    movie: Movie;
    setIsVideoOn: Function;
}

export function MovieDetailsCard(props: Props) {
    const { movie, setIsVideoOn } = props;
    const [opacity, setOpacity] = useState(0);
    const finalOpacity = 100;

    useEffect(() => {
        setOpacity(0);
    }, [movie?.backdrop_path]);

    useEffect(() => {
        const fadeIn = () => {
            setOpacity((prevOpacity) => {
                if (prevOpacity < finalOpacity) {
                    return Math.min(prevOpacity + 2.5, finalOpacity);
                }
                return prevOpacity;
            });
        };

        const timer = setInterval(fadeIn, 10);

        return () => clearInterval(timer);
    }, [opacity]);

    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.0), rgba(18, 18, 18, 1) 98%),url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
                opacity: `${opacity}%`,
                height: '85vh',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform',
            }}
        >
            <Box sx={{ ml: 4, mr: 4 }}>
                <Grid container spacing={2} sx={{opacity:opacity}}>
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
                                    width="70%"
                                    height="40%"
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
                            <Typography variant="body1" sx={{ width: '70%' }}>
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
                                variant="h2"
                                align="right"
                                sx={{
                                    fontWeight: '500',
                                    textShadow: 'rgb(106, 166, 177) 2px 2px 2px'
                                }}
                            >
                                {movie?.title ?? movie?.name}
                            </Typography>
                            <Typography variant="h6" align="right">
                                {movie?.release_date ?? movie?.first_air_date} /{' '}
                                {movie?.original_title ??
                                    movie?.original_language}
                            </Typography>
                            <Typography align="right">
                                {movie?.genres &&
                                    movie?.genres.map((genre, index) => (
                                        <>
                                            <span key={index}>
                                                {genre.name}
                                            </span>
                                            {index !==
                                                movie.genres.length - 1 && (
                                                <span> / </span>
                                            )}
                                        </>
                                    ))}
                            </Typography>
                            <Typography
                                align="right"
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
                                    name="read-only"
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
