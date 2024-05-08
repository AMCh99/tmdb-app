import TrendingMovies from '../components/home/trendingMovies';
import TrendingTvSeries from '../components/home/trendingTvSeries';
import MainCard from '../components/home/mainCard';
import { NavBar } from '../components/navbar';

const dotenv = require('dotenv');
dotenv.config();

export default function Home() {
    return (
        <>
            <NavBar />
            <MainCard />
            <TrendingMovies />
            <TrendingTvSeries />
        </>
    );
}
