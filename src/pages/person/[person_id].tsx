import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TrendingService } from '../../service/trending.service';
import { Person } from '../../types/person';
import { NavBar } from '../../components/navbar/navbar';
import { Container, Grid, Typography, Paper, Avatar, Box } from '@mui/material';
import { TrendingScrollBar } from '../../components/trendingScrollableBar';
import { Movie } from '../../types/movie';
import theme from '../../theme/theme';

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
            <Box
                sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${person.profile_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px)',
                    WebkitFilter: 'blur(8px)',
                    height: '100vh',
                    position: 'fixed',
                    width: '100%',
                    zIndex: -1,
                    opacity: 0.2
                }}
            />
            <Container sx={{ mt: 4, mb: 4 }} maxWidth="lg">
                <Paper sx={{ p: 4, backgroundColor: 'rgba(30, 30, 30, 0.8)', color: 'white' }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Avatar
                                alt={person.name}
                                src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                                sx={{ width: '100%', height: 'auto', boxShadow: '0 0 20px rgba(0,0,0,0.7)' }}
                                variant="rounded"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h3" gutterBottom sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
                                {person.name}
                            </Typography>
                            {person.also_known_as && person.also_known_as.length > 0 && (
                                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.light }}>
                                    Also Known As: {person.also_known_as.join(', ')}
                                </Typography>
                            )}
                            <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, mt: 2 }}>
                                Biography
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ color: '#cccccc', lineHeight: 1.8 }}>
                                {person.biography || 'No biography available.'}
                            </Typography>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary.light }}>
                                        <strong>Born:</strong> {person.birthday}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary.light }}>
                                        <strong>Place of Birth:</strong> {person.place_of_birth || 'N/A'}
                                    </Typography>
                                </Grid>
                                {person.deathday && (
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" sx={{ color: theme.palette.primary.light }}>
                                            <strong>Died:</strong> {person.deathday}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
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

