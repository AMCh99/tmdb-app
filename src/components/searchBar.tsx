import {
    Autocomplete,
    Button,
    IconButton,
    InputAdornment,
    TextField
} from '@mui/material';
import React, { useState } from 'react';
import { TrendingService } from '../service/trending.service';
import { Movie } from '../types/movie';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import theme from '../utils/theme/theme';

export function SearchBar() {
    const router = useRouter();

    const [searchingOptions, setSearchingOptions] = useState<
        { label: string; id: number; media_type: string }[]
    >([]);
    const [option, setOption] = useState<{
        label: string;
        id: number;
        media_type: string;
    }>();

    const handleOptions = async (event: any) => {
        const searchData = await TrendingService.getSearching(
            event.target.value
        );
        const options: any = [];
        searchData.map((movie: Movie) =>
            options.push({
                label: movie.name ?? movie.title,
                id: movie.id,
                media_type: movie.media_type
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

    console.log(option);

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
                renderInput={(params: any) => (
                    <TextField
                        size="large"
                        placeholder="Searching..."
                        sx={{
                            width: '16vw',
                            '& .MuiInputBase-root': {
                                p: 0,
                                pl: 1,
                                height: '3.5em'
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
                    alignSelf: 'center'
                }}
                onClick={() =>
                    option?.media_type &&
                    option?.id &&
                    router.push(`${option?.media_type}/${option?.id}`)
                }
            >
                <SearchIcon />
            </IconButton>
        </form>
    );
}
