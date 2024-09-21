class TrendingService {
    static async getDatabaseData(url: string) {
        const dotenv = require('dotenv');
        dotenv.config();
        return fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('error');
                }

                const res = await response.json();
                return res.results;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    }

    static async getTrendingMovies() {
        const url =
            'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
        return this.getDatabaseData(url);
    }

    static async getTrendingTvShows() {
        const url =
            'https://api.themoviedb.org/3/trending/tv/week?language=en-US';
        return this.getDatabaseData(url);
    }

    static async getTrendingAllToday() {
        const url =
            'https://api.themoviedb.org/3/trending/all/day?language=en-US';
        return this.getDatabaseData(url);
    }

    static async getVideos(movie_id: number, type: string) {
        const url = `https://api.themoviedb.org/3/${type}/${movie_id}/videos`;
        return this.getDatabaseData(url);
    }

    static async getDetails(movie_id: number, type: string) {
        const url = `https://api.themoviedb.org/3/${type}/${movie_id}`;

        try {
            const movieDetailsPromise = fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                }
            }).then(async (response) => {
                if (!response.ok) {
                    throw new Error('Error fetching movie details');
                }
                return response.json();
            });

            const movieVideosPromise = this.getVideos(movie_id, type);

            const [movieDetails, movieVideos] = await Promise.all([
                movieDetailsPromise,
                movieVideosPromise
            ]);

            const trailer = movieVideos?.filter(
                (item: any) => item?.type === 'Trailer'
            );
            return { ...movieDetails, trailer };
        } catch (error) {
            console.error(error);
            return { movieDetails: null, movieVideos: null };
        }
    }

    static async getSearching(query: string) {
        const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
        return this.getDatabaseData(url);
    }

    static async getLists(type: string, list: string) {
        const url = `https://api.themoviedb.org/3/${type}/${list}?language=en-US&page=1`;
        return this.getDatabaseData(url);
    }

    static async getReviews(movie_id: number, type: string) {
        const url = `https://api.themoviedb.org/3/movie/${movie_id}/reviews`;
        return this.getDatabaseData(url);
    }
}

export { TrendingService };
