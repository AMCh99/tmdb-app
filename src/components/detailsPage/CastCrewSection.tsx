import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Typography
} from '@mui/material';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Cast } from '../../types/cast';
import { Crew } from '../../types/crew';

interface Props {
    readonly castList: Cast[] | null;
    readonly crewList: Crew[] | null;
}

export function CastAndCrewSection(props: Props) {
    const { castList, crewList } = props;
    const defaultSlice = castList ? 12 : 6;
    const [itemsSlice, setitemsSlice] = useState<number>(defaultSlice);
    const details = castList ? castList : crewList;

    const handleChangeSlice = () => {
        if (details) {
            itemsSlice == defaultSlice
                ? setitemsSlice(details?.length)
                : setitemsSlice(defaultSlice);
        }
    };

    if (details) {
        return (
            <Container sx={{ margin: 'auto' }} maxWidth='xl'>
                <Typography variant='h6' sx={{ m: 4 }}>
                    {castList ? 'Cast' : 'Crew'}
                </Typography>
                <Container sx={{ mb: 4 }} maxWidth='xl'>
                    <Paper elevation={1} sx={{ p: 3 }}>
                        <Grid container>
                            {details
                                .slice(0, itemsSlice)
                                .map((item: Cast | Crew) => {
                                    return (
                                        <Grid key={item.id} item md={2} sx={{ mb: 3 }}>
                                            <Avatar
                                                alt={item.name}
                                                src={
                                                    'https://image.tmdb.org/t/p/original' +
                                                    item.profile_path
                                                }
                                                sx={{
                                                    width: 150,
                                                    height: 150,
                                                    margin: 'auto',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <Typography variant='button'>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant='caption'>
                                                    {'character' in item
                                                        ? item.character
                                                        : item.job}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    );
                                })}
                        </Grid>
                        {details.length > defaultSlice && (
                            <Button
                                sx={{ display: 'flex', margin: 'auto' }}
                                onClick={handleChangeSlice}
                            >
                                {itemsSlice != defaultSlice ? 'Show less' :'Show all'}
                            </Button>
                        )}
                    </Paper>
                </Container>
            </Container>
        );
    }
}
