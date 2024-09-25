import {
    alpha,
    Autocomplete,
    Box,
    Button,
    CardActions,
    CardContent,
    Container,
    IconButton,
    InputAdornment,
    InputBase,
    Rating,
    styled,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import { TrendingService } from '../service/trending.service';
import { Movie } from '../types/movie';
import { Option } from '../types/searchOption';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../theme/theme';

export function SearchBar() {
    const router = useRouter();

    const [searchingOptions, setSearchingOptions] = useState<Option[]>([]);
    const [option, setOption] = useState<Option>();

    const handleOptions = async (event: any) => {
        const searchData = await TrendingService.getSearching(
            event.target.value
        );
        const options: any = [];
        searchData.map((movie: Movie) =>
            options.push({
                label: movie.name ?? movie.title,
                id: movie.id,
                media_type: movie.media_type,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date
            })
        );
        console.log(options);
        setSearchingOptions(options);
    };

    const handleChange = (value: string) => {
        const option = searchingOptions.filter(
            (movie) => movie.label.toLowerCase() == value?.toLowerCase()
        );
        setOption(option[0]);
    };

    // const goToMoviePage = (option?: Option) => {
    //     if (option?.media_type && option?.id) {
    //         router.push({
    //             pathname: `/${option.media_type}/[id]`,
    //             query: { id: option.id }
    //         });
    //     } else {
    //         console.log("Invalid option:", option);
    //     }
    // };

    const goToMoviePage = (option?: Option) => {
        option?.media_type &&
            option?.id &&
            router.push(`${option?.media_type}/${option?.id}`);
    };

    return (
        <form style={{ display: 'flex' }}>
            <Autocomplete
                disablePortal
                id="searchBar"
                options={searchingOptions}
                freeSolo
                disableClearable
                onInputChange={(event: any) => {
                    handleChange(event.target.textContent);
                }}
                renderOption={(props, option) => {
                    return (
                        <Box
                            component={'li'}
                            // sx={{
                            //     display: 'flex',
                            //     justifyContent: 'space-between',
                            //     '&:hover':{
                            //         bgcolor: theme.palette.primary.main,
                            //         textShadow: 'rgb(0,0,0) 1px 1px 1px'
                            //     }

                            // }}
                            {...props}
                            onClick={() => {
                                goToMoviePage(option);
                                handleChange(option.label);
                            }}
                        >
                            <img
                                loading="lazy"
                                width={100}
                                alt=""
                                src={`https://image.tmdb.org/t/p/original${option.poster_path}`}
                            />
                            <CardContent>
                                <Typography variant="subtitle2" align="right">
                                    {option.label}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        height: 'min-content',
                                        float: 'right'
                                    }}
                                >
                                    <CardActions sx={{ p: 0 }}></CardActions>
                                    <Rating
                                        name="read-only"
                                        value={(option?.vote_average ?? 0) / 2}
                                        readOnly
                                        precision={0.1}
                                        sx={{ alignSelf: 'center', p: 0 }}
                                    />
                                </Box>
                            </CardContent>
                        </Box>
                    );
                }}
                renderInput={(params: any) => (
                    <TextField
                        size="large"
                        placeholder="Searching..."
                        sx={{
                            width: '16vw',
                            height:'2em',
                            '& .MuiInputBase-root': {
                                p: 0,
                                pl: 1,
                                borderRadius:"20px",
                                m:1,
                            },
                            '& input::placeholder': {
                                fontStyle: 'italic',
                                color: theme.palette.primary.main
                            }
                        }}
                        onChange={(event: any) => {
                            handleOptions(event);
                            handleChange(event.target.textContent);
                        }}
                        {...params}
                    />
                )}
            />
            <IconButton
                size="small"
                sx={{
                    height: 'min-content',
                    alignSelf: 'center',
                    ml:1
                }}
                onClick={() => goToMoviePage(option)}
            >
                <SearchIcon />
            </IconButton>
        </form>
    );
}
