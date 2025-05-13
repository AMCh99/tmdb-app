import { useEffect, useState } from 'react';
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

    const ELEMENT_WIDTH = 210;
    const SPEED = 3;
    const STEP = 10;
    const BUTTONS_WIDTH = 140;
    const SCROLL_ELEMENTS = 5;

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

    const forward = () => {
        sideScroll(
            document.getElementById(`scrollable_${id}`),
            'right',
            SPEED,
            ELEMENT_WIDTH * SCROLL_ELEMENTS,
            STEP
        );
    };

    const back = () => {
        sideScroll(
            document.getElementById(`scrollable_${id}`),
            'left',
            SPEED,
            ELEMENT_WIDTH * SCROLL_ELEMENTS,
            STEP
        );
    };

    const sideScroll = (
        element: any,
        direction: string,
        speed: number,
        distance: number,
        step: number
    ) => {
        let scrollAmount = 0;
        let slideTimer = setInterval(function () {
            if (direction == 'left') {
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if (scrollAmount >= distance) {
                window.clearInterval(slideTimer);
            }
        }, speed);
    };

    return (
            <Box sx={{ display: 'flex', p: 0 }}>
                <IconButton
                    onClick={back}
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
                    sx={{
                        m: 0,
                        p: 0,
                        width: `${width}px`,
                        transform: 'translate3d(0, 0, 0)',
                        willChange: 'transform'
                    }}
                >
                    <Grid
                        sx={{
                            display: 'flex',
                            scrollSnapType: 'x mandatory',
                            scrollSnapAlignl: 'center',
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
                    onClick={forward}
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
