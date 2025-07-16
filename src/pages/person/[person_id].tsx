import { useRouter } from 'next/router';
import { NavBar } from '../../components/navbar/navbar';
import { Container, Grid, Typography, Paper, Avatar, Box } from '@mui/material';
import { TrendingScrollBar } from '../../components/trendingScrollableBar';
import theme from '../../theme/theme';
import { usePersonDetails } from '../../hooks/usePersonDetails';
import { usePersonMovieCredits } from '../../hooks/usePersonMovieCredits';

export default function PersonPage() {
    const router = useRouter();
    const { person_id } = router.query;

    const id = typeof person_id === 'string' ? parseInt(person_id) : undefined;
    const { data: person, isLoading, error } = usePersonDetails(id as number);
    const { data: movieCredits, isLoading: isKnownForLoading, error: knownForError } = usePersonMovieCredits(id as number);

    if (isLoading || isKnownForLoading) {
        return <h1>Loading...</h1>;
    }
    if (error || !person || knownForError) {
        return <h1>Error loading person details.</h1>;
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
                            <Typography variant="h3" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
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
                {movieCredits?.cast?.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 2 }}>
                            Known For
                        </Typography>
                        <TrendingScrollBar moviesShowData={movieCredits.cast} id="known-for" media_type="movie" />
                    </Box>
                )}
            </Container>
        </>
    );
}

