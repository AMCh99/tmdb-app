import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Copyright from '../components/Copyright';
import { Movie } from '../types/movie';
import TrendingMovies from '../components/home/trendingMovies';
import TrendingTvSeries from '../components/home/trendingTvSeries';
import { Button } from '@mui/material';
import MainCard from '../components/home/mainCard';

export default function Home() {
    return (
        <>
            <MainCard />
            <TrendingMovies />
            <TrendingTvSeries />
            {/* <Button variant="contained">TEST BUTTON</Button> */}
        </>
    );
}
