import React from 'react';
import { NavBar } from '../components/navbar';
import TrendingTvSeries from '../components/home/trendingTvSeries';
import { MovieTvList } from '../components/upcoming';

export default function Shows() {
    return (
        <>
            <NavBar />
            <TrendingTvSeries />
            <MovieTvList media_type={'tv'} listType={'top_rated'} />
            <MovieTvList media_type={'tv'} listType={'airing_today'} />
        </>
    );
}
