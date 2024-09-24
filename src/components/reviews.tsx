import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TrendingService } from '../service/trending.service';
import { Copyright } from './Copyright';
import { Review } from '../types/review';
import Paper from '@mui/material/Paper';

interface Props {
    movie_id: number;
    type: string;
}

export function ReviewsSection(props: Props) {
    const { movie_id, type } = props;

    const [reviews, setReviews] = useState<Review[]>([]);
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

    if (reviews.length > 0){
        return (
            <Container sx={{ margin: 'auto' }} maxWidth="xl">
                <Typography variant="h6" sx={{ m:4 }}>
                    Reviews
                </Typography>
                {reviews.map((rev: Review) => {
                    return (
                        <Container sx={{ mb: 4 }} maxWidth="xl" id={rev.id}>
                            <Paper elevation={1} sx={{ p: 3 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        m: 1
                                    }}
                                >
                                    <Avatar
                                        alt={rev.author_details.username}
                                        src={
                                            'https://image.tmdb.org/t/p/original' +
                                            rev.author_details.avatar_path
                                        }
                                        sx={{ width: 75, height: 75 }}
                                    />
                                    <Typography variant="h6" sx={{ ml: 2 }}>
                                        {rev.author}
                                    </Typography>
                                </Box>
    
                                <Typography
                                    variant="body1"
                                    // sx={{
                                    //     display: '-webkit-box',
                                    //     WebkitBoxOrient: 'vertical',
                                    //     WebkitLineClamp: 3,
                                    //     alignContent: 'center',
                                    //     textOverflow: 'ellipsis',
                                    //     overflow: 'hidden'
                                    // }}
                                >
                                    {rev.content}
                                </Typography>
                            </Paper>
                        </Container>
                    );
                })}
            </Container>
        );
    }
}
