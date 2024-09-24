import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TrendingService } from '../service/trending.service';
import { Copyright } from './Copyright';
import { Review } from '../types/review';
import Paper from '@mui/material/Paper';
import { Details } from '../types/details';
import { Cast } from '../types/cast';
import { Crew } from '../types/crew';

interface Props {
    movie_id: number;
    type: string;
}
export default function CastAndCrewSection(props: Props) {
    const { movie_id, type } = props;

    const [details, setDetails] = useState<Details>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getReviews = async () => {
            const data = await TrendingService.getCreditDetails(movie_id, type);
            setDetails(data);
            setLoading(false);
        };
        getReviews();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (details && details.cast.length > 0) {
        return (
            <>
                <Container sx={{ margin: 'auto' }} maxWidth="xl">
                    <Typography variant="h6" sx={{ m: 4 }}>
                        Cast
                    </Typography>
                    <Container sx={{ mb: 4 }} maxWidth="xl">
                        <Paper elevation={1} sx={{ p: 3 }}>
                            <Grid container>
                                {details.cast
                                    .slice(0, 12)
                                    .map((castItem: Cast) => {
                                        return (
                                            <Grid item md={2} sx={{ mb: 3 }}>
                                                <Avatar
                                                    alt={castItem.name}
                                                    src={
                                                        'https://image.tmdb.org/t/p/original' +
                                                        castItem.profile_path
                                                    }
                                                    sx={{
                                                        width: 150,
                                                        height: 150,
                                                        margin: 'auto'
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Typography variant="button">
                                                        {castItem.name}
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        {castItem.character}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        );
                                    })}
                            </Grid>
                        </Paper>
                    </Container>
                </Container>

                <Container sx={{ margin: 'auto' }} maxWidth="xl">
                    <Typography variant="h6" sx={{ m: 4 }}>
                        Crew
                    </Typography>
                    <Container sx={{ mb: 4 }} maxWidth="xl">
                        <Paper elevation={1} sx={{ p: 3 }}>
                            <Grid container>
                                {details.crew
                                    .slice(0, 6)
                                    .map((castItem: Crew) => {
                                        return (
                                            <Grid item md={2} sx={{ mb: 3 }}>
                                                <Avatar
                                                    alt={castItem.name}
                                                    src={
                                                        'https://image.tmdb.org/t/p/original' +
                                                        castItem.profile_path
                                                    }
                                                    sx={{
                                                        width: 150,
                                                        height: 150,
                                                        margin: 'auto'
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <Typography variant="button">
                                                        {castItem.name}
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        {castItem.job}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        );
                                    })}
                            </Grid>
                        </Paper>
                    </Container>
                </Container>
            </>
        );
    }
}
