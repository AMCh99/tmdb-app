import { CastAndCrewSection } from './CastCrewSection';
import { useMovieCredits } from '../../hooks/useMovieCredits';

interface Props {
    readonly movie_id: number;
    readonly media_type: string;
}
export default function CastAndCrew(props: Props) {
    const { movie_id, media_type } = props;

    const {data: details, isLoading} = useMovieCredits(movie_id as unknown as number, media_type);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    
    if (details) {
        return (
            <>
                {details.cast && details.cast.length > 0 && <CastAndCrewSection castList={details.cast} crewList={null} />}
                {details.crew && details.crew.length > 0 && <CastAndCrewSection castList={null} crewList={details.crew} />}
            </>
        );
    }
}
