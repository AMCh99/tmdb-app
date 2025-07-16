class TrendingService {
    static async getTrendingMovies() {
        const res = await fetch('/api/tmdbTrending?type=movie&time=week');
        if (!res.ok) throw new Error('Failed to fetch trending movies');
        const data = await res.json();
        return data.results;
    }

    static async getTrendingTvShows() {
        const res = await fetch('/api/tmdbTrending?type=tv&time=week');
        if (!res.ok) throw new Error('Failed to fetch trending tv shows');
        const data = await res.json();
        return data.results;
    }

    static async getTrendingAllToday() {
        const res = await fetch('/api/tmdbTrending?type=all&time=day');
        if (!res.ok) throw new Error('Failed to fetch trending all today');
        const data = await res.json();
        return data.results;
    }

    static async getVideos(movie_id: number, type: string) {
        const res = await fetch(`/api/tmdbVideos?id=${movie_id}&type=${type}`);
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        return data.results;
    }

    static async getDetails(movie_id: number, type: string) {
        const res = await fetch(`/api/tmdbDetails?id=${movie_id}&type=${type}`);
        if (!res.ok) throw new Error('Failed to fetch details');
        return await res.json();
    }

    static async getSearching(query: string) {
        const res = await fetch(`/api/tmdbSearch?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Failed to search');
        const data = await res.json();
        return data.results;
    }

    static async getLists(type: string, list: string) {
        const res = await fetch(`/api/tmdbLists?type=${type}&list=${list}`);
        if (!res.ok) throw new Error('Failed to fetch lists');
        const data = await res.json();
        return data.results;
    }

    static async getReviews(movie_id: number, type: string) {
        const res = await fetch(`/api/tmdbReviews?id=${movie_id}&type=${type}`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();
        return data.results;
    }

    static async getCreditDetails(id: number, type: string) {
        const res = await fetch(`/api/tmdbCredits?id=${id}&type=${type}`);
        if (!res.ok) throw new Error('Failed to fetch credits');
        return await res.json();
    }
}

export { TrendingService };
