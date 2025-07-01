import React, { useEffect, useState } from 'react';
import { TrendingService } from '../../service/trending.service';
import { Details } from '../../types/details';
import { CastAndCrewSection } from './CastCrewSection';

interface Props {
    readonly movie_id: number;
    readonly type: string;
}
export default function CastAndCrew(props: Props) {
    const { movie_id, type } = props;

    const [details, setDetails] = useState<Details>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getReviews = async () => {
            const data = await TrendingService.getCreditDetails(movie_id, type);
            console.log(data);
            setDetails(data);
            setLoading(false);
        };
        getReviews();
    }, [movie_id]);

    if (loading) {
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
