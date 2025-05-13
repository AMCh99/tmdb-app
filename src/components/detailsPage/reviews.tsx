import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { TrendingService } from '../../service/trending.service';
import { Review } from '../../types/review';
import ReviewElement from './review';

interface Props {
    readonly movie_id: number;
    readonly type: string;
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
    }, [movie_id]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (reviews.length > 0) {
        return (
            <Container sx={{ margin: 'auto' }} maxWidth='xl'>
                <Typography variant='h6' sx={{ m: 4 }}>
                    Reviews
                </Typography>
                {reviews.map((review: Review) => {
                    return <ReviewElement key={review.id} review={review} />;
                })}
            </Container>
        );
    }
}
