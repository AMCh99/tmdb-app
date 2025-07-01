import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TrendingService } from '../../service/trending.service';
import { Person } from '../../types/person';
import { NavBar } from '../../components/navbar/navbar';
import { Container, Grid, Typography, Paper, Avatar, Box } from '@mui/material';
import { TrendingScrollBar } from '../../components/trendingScrollableBar';
import { Movie } from '../../types/movie';

export default function PersonPage() {
    const router = useRouter();
    const { person_id } = router.query;
    const [person, setPerson] = useState<Person | null>(null);
    const [knownFor, setKnownFor] = useState<Movie[]>([]);

    useEffect(() => {
        if (typeof person_id === 'string') {
            const getData = async () => {
                const personData = await TrendingService.getPersonDetails(
                    parseInt(person_id)
                );
                setPerson(personData);

                const movieCredits = await TrendingService.getPersonMovieCredits(
                    parseInt(person_id)
                );
                setKnownFor(movieCredits.cast);
            };
            getData();
        }
    }, [person_id]);

    if (!person) {
        return <h1>Loading...</h1>;
    }
    
    return (
        <>
            <NavBar />
            <Container sx={{ mt: 4}} maxWidth="lg">
                <Paper sx={{ p: 4, backgroundColor: '#1e1e1e', color: 'white' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Avatar
                                alt={person.name}
                                src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                                sx={{ width: '100%', height: 'auto', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                                variant="rounded"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" gutterBottom sx={{ color: '#6aa6b1' }}>
                                {person.name}
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: '#cccccc' }}>
                                {person.biography || 'No biography available.'}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#aaaaaa' }}>
                                <strong>Born:</strong> {person.birthday}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#aaaaaa' }}>
                                <strong>Place of Birth:</strong> {person.place_of_birth || 'N/A'}
                            </Typography>
                            {person.deathday && (
                                <Typography variant="subtitle1" sx={{ color: '#aaaaaa' }}>
                                    <strong>Died:</strong> {person.deathday}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
                {knownFor?.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 2 }}>
                            Known For
                        </Typography>
                        <TrendingScrollBar moviesShowData={knownFor} id="known-for" media_type="movie" />
                    </Box>
                )}
            </Container>
        </>
    );
}
