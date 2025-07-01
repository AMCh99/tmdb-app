import { useEffect, useState, useRef } from 'react';
import { Movie } from '../types/movie';
import { Box, Grid, IconButton } from '@mui/material';
import { MovieCard } from './home/movieCard';
import { ScrollableCardContent } from '../utils/custom-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
    readonly moviesShowData: Movie[];
    readonly id: string;
    readonly media_type: 'movie' | 'tv';
}

export function TrendingScrollBar(props: Props) {
    const { moviesShowData, id, media_type } = props;
    const [width, setWidth] = useState<number>(1000);
    const scrollRef = useRef<HTMLDivElement>(null);

    const ELEMENT_WIDTH = 210;
    const BUTTONS_WIDTH = 140;

    const setNewWidth = () => {
        const calculateWidth =
            Math.floor((window.innerWidth - BUTTONS_WIDTH) / ELEMENT_WIDTH) *
            ELEMENT_WIDTH;
        setWidth(calculateWidth);
    };

    useEffect(() => {
        setNewWidth();

        const handleResize = () => {
            setNewWidth();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const scroll = (scrollOffset: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={() => scroll(-width)}
                sx={{
                    margin: '10px',
                    p: 0,
                    width: '50px',
                    borderRadius: '5px'
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>

            <ScrollableCardContent
                id={`scrollable_${id}`}
                ref={scrollRef}
                sx={{
                    m: 0,
                    p: 0,
                    width: `${width}px`,
                    overflowX: 'scroll',
                    scrollbarWidth: 'none', // Firefox
                    '&::-webkit-scrollbar': {
                        display: 'none' // Chrome, Safari, Opera
                    }
                }}
            >
                <Grid
                    sx={{
                        display: 'flex',
                        m: 0,
                        p: 0
                    }}
                >
                    {moviesShowData?.map((movie) => {
                        return (
                            <MovieCard
                                movie={movie}
                                key={movie.id + 'mov_card'}
                                media_type={media_type}
                            />
                        );
                    })}
                </Grid>
            </ScrollableCardContent>

            <IconButton
                onClick={() => scroll(width)}
                sx={{
                    margin: '10px',
                    p: 0,
                    width: '50px',
                    borderRadius: '5px'
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}
