import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/movie';
import { TrendingService } from '../../service/trending.service';
import {
    Box,
    Container,
    Typography,
    Grid,
    Rating,
    IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReactPlayer from 'react-player';

interface Props {}

export default function MainCard(props: Props) {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentMovie, setCurentMovie] = useState<Movie | null>(null);
    const [counter, setCounter] = useState<number>(0);
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const data = await TrendingService.getTrendingAllToday();
            setTrending(data);
            setLoading(false);

            const details = await TrendingService.getDetails(
                data[0]?.id,
                data[0]?.media_type
            );
            setCurentMovie(details);
        };
        getData();
    }, []);

    useEffect(() => {
        if (!isVideoOn && currentMovie) {
            setTimeout(async () => {
                const details = await TrendingService.getDetails(
                    trending[counter]?.id,
                    trending[counter]?.media_type
                );
                setCurentMovie(details);
                counter >= trending.length - 1
                    ? setCounter(0)
                    : setCounter(counter + 1);
            }, 12000);
        }
    });

    if (loading) {
        return <h1>Loading...</h1>;
    }
    console.log(currentMovie);
    // console.log(video);

    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.0), rgba(18, 18, 18, 1) 90%),url(https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path})`,
                height: '100vh',
                backgroundSize: '100%',
                backgroundPosition: 'top'
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
                            {currentMovie && (
                                <ReactPlayer
                                    url={`https://www.youtube.com/embed/${currentMovie?.trailer[0]?.key}`}
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
                                {currentMovie?.overview}
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
                                {currentMovie?.title ?? currentMovie?.name}
                            </Typography>
                            <Typography variant="h6" align="right">
                                {currentMovie?.release_date ??
                                    currentMovie?.first_air_date}{' '}
                                /{' '}
                                {currentMovie?.original_title ??
                                    currentMovie?.original_language}
                            </Typography>
                            <Typography align="right">
                                {currentMovie?.genres.map((genre, index) => (
                                    <>
                                        <span key={index}>{genre.name}</span>
                                        {index !==
                                            currentMovie.genres.length - 1 && (
                                            <span> / </span>
                                        )}
                                    </>
                                ))}
                            </Typography>
                            <Typography align="right">
                                <IconButton size="large">
                                    <FavoriteIcon />
                                </IconButton>
                                <Rating
                                    name="read-only"
                                    value={
                                        (currentMovie?.vote_average ?? 0) / 2
                                    }
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
