import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Review } from '../../types/review';
import Paper from '@mui/material/Paper';

interface Props {
    review: Review;
}

export default function ReviewElement(props: Props) {
    const { review } = props;
    const [webkitLineClamp, setWebkitLineClamp] = useState<number | null>(3);

    const handleChangeWebkitLineClamp = () => {
        webkitLineClamp == 3 ? setWebkitLineClamp(null) : setWebkitLineClamp(3);
    };

    return (
        <Container sx={{ mb: 4 }} maxWidth='xl' id={review.id}>
            <Paper elevation={1} sx={{ p: 3 }}>
                <Box
                    sx={{
                        display: 'flex',
                        m: 1
                    }}
                >
                    <Avatar
                        alt={review.author_details.username}
                        src={
                            'https://image.tmdb.org/t/p/original' +
                            review.author_details.avatar_path
                        }
                        sx={{ width: 75, height: 75 }}
                    />
                    <Typography variant='h6' sx={{ ml: 2 }}>
                        {review.author}
                    </Typography>
                </Box>

                <Typography
                    variant='body1'
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: webkitLineClamp,
                        alignContent: 'center',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}
                >
                    {review.content}
                </Typography>
                {review && review.content.length > 600 && (
                    <Button
                        sx={{ display: 'flex', margin: 'auto' }}
                        onClick={handleChangeWebkitLineClamp}
                    >
                        {webkitLineClamp != 3 ? 'Show less' : 'Show all'}
                    </Button>
                )}
            </Paper>
        </Container>
    );
}
