import { NavBar } from '../components/navbar/navbar';
import TrendingTvSeries from '../components/home/trendingTvSeries';
import { MovieTvList } from '../components/MovieTvList';

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
