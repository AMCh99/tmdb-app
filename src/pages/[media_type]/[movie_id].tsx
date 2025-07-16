import { useState } from 'react';
import { useRouter } from 'next/router';
import { NavBar } from '../../components/navbar/navbar';
import { MovieDetailsCard } from '../../components/movieDetailsCard';
import { ReviewsSection } from '../../components/detailsPage/reviews';
import CastAndCrew from '../../components/detailsPage/castAndCrew';
import { useMovieDetails } from '../../hooks/useMovieDetails';

interface RouteParams {
    movie_id: string;
    media_type: string;
}

export default function MoviePage() {
    const router = useRouter();
    const { movie_id, media_type } = router.query;
    const [isVideoOn, setIsVideoOn] = useState<boolean>(false);

    const {data:movie} = useMovieDetails(movie_id as unknown as number, media_type as string)


    if (movie != null)
        return (
            <>
                <NavBar />
                <MovieDetailsCard
                    movie={movie}
                    setIsVideoOn={setIsVideoOn}
                    isFading={false}
                />

                {typeof movie_id === 'string' &&
                    typeof media_type === 'string' && (
                        <CastAndCrew movie_id={movie.id} media_type={media_type} />
                    )}

                {typeof movie_id === 'string' &&
                    typeof media_type === 'string' && (
                        <ReviewsSection movie_id={movie.id} media_type={media_type} />
                    )}
            </>
        );
}
