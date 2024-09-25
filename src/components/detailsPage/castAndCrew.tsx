import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TrendingService } from '../../service/trending.service';
import { Copyright } from '../Copyright';
import { Review } from '../../types/review';
import Paper from '@mui/material/Paper';
import { Details } from '../../types/details';
import { Cast } from '../../types/cast';
import { Crew } from '../../types/crew';
import { CastAndCrewSection } from './CastCrewSection';

interface Props {
    movie_id: number;
    type: string;
}
export default function CastAndCrew(props: Props) {
    const { movie_id, type } = props;

    const [details, setDetails] = useState<Details>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getReviews = async () => {
            const data = await TrendingService.getCreditDetails(movie_id, type);
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
                {details.cast.length > 0 && <CastAndCrewSection castList={details.cast} crewList={null} />}
                {details.crew.length > 0 && <CastAndCrewSection castList={null} crewList={details.crew} />}
            </>
        );
    }
}
