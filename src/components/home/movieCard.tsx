import React from 'react';
import { Movie } from '../../types/movie';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Typography
} from '@mui/material';

interface Props {
    movie: Movie;
}

export function MovieCard(props: Props) {
    const { movie } = props;

    return (
        <Grid item>
            <Card raised sx={{ width: '200px' }}>
                <CardMedia
                    component="img"
                    alt={`backdrop: ${movie.title}`}
                    height="100%"
                    image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
                <CardContent sx={{height:"150px"}}>
                    <Typography variant="h6">{movie.title ?? movie?.name}</Typography>
                    <Typography variant="overline">{movie.vote_average}/10</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
