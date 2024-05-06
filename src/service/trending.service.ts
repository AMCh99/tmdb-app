class TrendingService {
    static options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDAyYTRiMTJlNzQxZTkzZDdlMjBiZTVkNmY2MzRkNiIsInN1YiI6IjYzY2M2OTU5Y2VlNDgxMDBkZWU4OWU0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6zgSiWjnA_2frOOKjORgzgAHs3tbYQfd9zGi_rhct5Y'
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
}

export { TrendingService };
