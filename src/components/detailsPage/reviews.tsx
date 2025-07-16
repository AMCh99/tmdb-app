import { Container, Typography } from '@mui/material';
import { Review } from '../../types/review';
import ReviewElement from './review';
import { useMovieReviews } from '../../hooks/useMovieReviews';

interface Props {
    readonly movie_id: number;
    readonly media_type: string;
}

export function ReviewsSection(props: Props) {
    const { movie_id, media_type } = props;


    const {data:reviews, isLoading } = useMovieReviews(movie_id as unknown as number, media_type)

    if (isLoading) {
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
