class TrendingService {
    static options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
        }
    };

    static async getTrending(url: string) {
        return fetch(url, this.options)
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
        return this.getTrending(url);
    }

    static async getTrendingTvShows() {
        const url =
            'https://api.themoviedb.org/3/trending/tv/week?language=en-US';
        return this.getTrending(url);
    }

    static async getTrendingAllToday() {
        const url =
            'https://api.themoviedb.org/3/trending/all/day?language=en-US';
        return this.getTrending(url);
    }

    static async getVideos(movie_id: number, type: string) {
        const url = `https://api.themoviedb.org/3/${type}/${movie_id}/videos`;
        return this.getTrending(url);
    }
}

export { TrendingService };
