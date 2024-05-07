import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/movie';
import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { MovieCard } from './movieCard';
import { ScrollableCardContent } from '../../utils/theme/custom-components';
import { TrendingService } from '../../service/trending.service';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
    moviesShowData: Movie[];
    id: string;
}

export function TrendingScrollBar(props: Props) {
    const { moviesShowData, id } = props;
    const [width, setWidth] = useState<number>(1000);

    const ELEMENT_WIDTH = 210;
    const SPEED = 1;
    const STEP = 15;

    const setNewWidth = () => {
        const calculateWidth =
            Math.floor((window.innerWidth - 140) / 210) * 210;
        setWidth(calculateWidth);
    };

    useEffect(() => {
        setNewWidth();
    }, []);

    if (typeof onresize !== 'undefined') {
        onresize = () => {
            setNewWidth();
        };
    }

    const forward = () => {
        sideScroll(
            document.getElementById(`scrollable_${id}`),
            'right',
            SPEED,
            ELEMENT_WIDTH * 3,
            STEP
        );
    };

    const back = () => {
        sideScroll(
            document.getElementById(`scrollable_${id}`),
            'left',
            SPEED,
            ELEMENT_WIDTH * 3,
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
        var slideTimer = setInterval(function () {
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
        <>
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
                    sx={{ m: 0, p: 0, width: `${width}px` }}
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
        </>
    );
}
