import { NavBar } from '../components/navbar/navbar';
import TrendingMovies from '../components/home/trendingMovies';
import { MovieTvList } from '../components/MovieTvList';

export default function Movies() {
    return (
        <>
            <NavBar />
            <TrendingMovies />
            <MovieTvList media_type={'movie'} listType={'top_rated'} />
            <MovieTvList media_type={'movie'} listType={'upcoming'} />
        </>
    );
}
