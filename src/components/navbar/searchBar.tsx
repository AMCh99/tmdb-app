import {
    Autocomplete,
    Box,
    CardActions,
    CardContent,
    IconButton,
    Rating,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { Option } from '../../types/searchOption';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../../theme/theme';
import { useSearchMulti } from '../../hooks/useSearchMulti';
import Image from 'next/image'

export function SearchBar() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const { data: searchingOptions = [] } = useSearchMulti(searchValue);
    const [option, setOption] = useState<Option>();

    const handleInputChange = (event: any) => {
        setSearchValue(event.target.value);
    };

    const handleChange = (value: string) => {
        const option = searchingOptions.filter(
            (movie: any) => (movie.name ?? movie.title)?.toLowerCase() === value?.toLowerCase()
        );
        setOption(option[0]);
    };

    const goToMoviePage = (option?: Option) => {
        option?.media_type &&
            option?.id &&
            router.push(
                `/${option.media_type}/${option.id}`
            )
    };

    console.log(searchingOptions)
    return (
        <Box>
            <Autocomplete
                freeSolo
                options={searchingOptions}
                getOptionLabel={(option: any) => option.name ?? option.title ?? ''}
                onInputChange={(_, value) => handleChange(value)}
                onChange={(_, value) => goToMoviePage(value as Option)}
                renderOption={(props, option) => {
                    return (
                        <Box
                            component={'li'}
                            {...props}
                            onClick={() => {
                                goToMoviePage(option);
                                handleChange(option.label);
                            }}
                        >
                            <Image
                                loading="lazy"
                                width={110}
                                height={160}
                                alt=""
                                src={`https://image.tmdb.org/t/p/w185${option.poster_path}`}
                            />
                            <CardContent>
                                <Typography variant="subtitle2" align="right">
                                    {option.name ?? option.original_title} 
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
                renderInput={(params) => (
                    <TextField
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
                        {...params}
                        placeholder="Searching..."
                        variant="outlined"
                        onChange={handleInputChange}
                        value={searchValue}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {params.InputProps.endAdornment}
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </>
                            ),
                        }}
                    />
                )}
            />
        </Box>
    );
}
