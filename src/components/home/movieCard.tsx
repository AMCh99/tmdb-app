import { useState } from 'react';
import { Movie } from '../../types/movie';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Rating,
    Typography
} from '@mui/material';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { useRouter } from 'next/router';

interface Props {
    readonly movie: Movie;
    readonly media_type: 'movie' | 'tv';
}

export function MovieCard(props: Props) {
    const { movie, media_type } = props;
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const router = useRouter();

    return (
        <Grid
            item
            onClick={() =>
                router.push(`/${movie.media_type ?? media_type}/${movie.id}`)
            }
        >
            <Card raised sx={{ width: '200px', margin: '5px' }}>
                <Box
                    sx={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.poster_path})`,
                        height: '300px',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    onMouseEnter={() => {
                        setIsMouseOver(true);
                    }}
                    onMouseLeave={() => {
                        setIsMouseOver(false);
                    }}
                >
                    <CardContent
                        sx={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, 0.0), rgba(106, 166, 177,0.9) 70%)`,
                            height: '100%',
                            alignContent: 'end',
                            opacity: isMouseOver ? 1 : 0,
                            transition: 'opacity 0.2s ease-in-out'
                        }}
                    >
                        <Typography variant="subtitle2" align="right">
                            {movie.title ?? movie?.name}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                height: 'min-content',
                                float: 'right'
                            }}
                        >
                            <CardActions sx={{ p: 0 }}>
                                <IconButton>
                                    <WatchLaterIcon />
                                </IconButton>
                            </CardActions>
                            <Rating
                                name="read-only"
                                value={(movie?.vote_average ?? 0) / 2}
                                readOnly
                                precision={0.1}
                                sx={{ alignSelf: 'center', p: 0 }}
                            />
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    );
}
