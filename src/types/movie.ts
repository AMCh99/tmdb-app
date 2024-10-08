import { Trailer } from './trailer';

export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: any;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    first_air_date?: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string | null;
    title: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    trailer: Trailer[];
    media_type: string;
}

interface Genre {
    id: number;
    name: string;
}
