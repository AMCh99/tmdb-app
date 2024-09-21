import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TrendingService } from '../service/trending.service';
import { Copyright } from './Copyright';

interface Props {
    movie_id: number;
    type: string;
}

export function ReviewsSection(props: Props) {
    const { movie_id, type } = props;

    const [reviews, setReviews] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getReviews = async () => {
            const data = await TrendingService.getReviews(movie_id, type);
            setReviews(data);
            setLoading(false);
        };
        getReviews();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    console.log(reviews);

    return (
        <Box
        // sx={{ display: 'flex', flexDirection: 'column' }}
        >
            <Box sx={{ margin: 'auto' }}>
                <Typography variant="h6" sx={{ marginLeft: '75px' }}>
                    Reviews
                </Typography>
                {reviews.map((rev:any) => {
                    return (
                        <Container sx={{mb:4}} maxWidth="xl">
                            <Typography variant='button'>{rev.author}</Typography>
                            <Typography variant='body1'>{rev.content}</Typography>
                        </Container>
                    );
                })}
            </Box>
            <Copyright/>
        </Box>
    );
}
