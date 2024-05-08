import TrendingMovies from '../components/home/trendingMovies';
import TrendingTvSeries from '../components/home/trendingTvSeries';
import MainCard from '../components/home/mainCard';
import { NavBar } from '../components/navbar';

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
