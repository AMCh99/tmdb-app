import { TrendingService } from '../service/trending.service';

global.fetch = jest.fn();

describe('TrendingService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockFetchResponse = (data: any, ok = true) => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok,
            json: jest.fn().mockResolvedValue(data),
        });
    };

    test('getTrendingMovies should fetch trending movies', async () => {
        const mockData = { results: [{ id: 1, name: 'Movie 1' }] };
        mockFetchResponse(mockData);

        const result = await TrendingService.getTrendingMovies();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
            expect.anything()
        );
        expect(result).toEqual(mockData.results);
    });

    test('getTrendingTvShows should fetch trending TV shows', async () => {
        const mockData = { results: [{ id: 2, name: 'TV Show 1' }] };
        mockFetchResponse(mockData);

        const result = await TrendingService.getTrendingTvShows();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/trending/tv/week?language=en-US',
            expect.anything()
        );
        expect(result).toEqual(mockData.results);
    });

    test('getTrendingAllToday should fetch trending movies and TV shows', async () => {
        const mockData = { results: [{ id: 3, name: 'Content 1' }] };
        mockFetchResponse(mockData);

        const result = await TrendingService.getTrendingAllToday();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/trending/all/day?language=en-US',
            expect.anything()
        );
        expect(result).toEqual(mockData.results);
    });

    test('getVideos should fetch videos for a movie', async () => {
        const mockData = { results: [{ id: 4, type: 'Trailer' }] };
        mockFetchResponse(mockData);

        const result = await TrendingService.getVideos(123, 'movie');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/movie/123/videos',
            expect.anything()
        );
        expect(result).toEqual(mockData.results);
    });

    test('getDetails should fetch movie details and videos', async () => {
        const mockDetails = { id: 1, title: 'Movie 1' };

        mockFetchResponse(mockDetails);

        const result = await TrendingService.getDetails(123, 'movie');

        expect(fetch).toHaveBeenNthCalledWith(
            1,
            'https://api.themoviedb.org/3/movie/123',
            expect.anything()
        );
        expect(fetch).toHaveBeenNthCalledWith(
            2,
            'https://api.themoviedb.org/3/movie/123/videos',
            expect.anything()
        );
        expect(result).toEqual({ ...mockDetails });
    });

    test('getSearching should search for movies and TV shows', async () => {
        const mockData = { results: [{ id: 5, name: 'Search Result 1' }] };
        mockFetchResponse(mockData);

        const result = await TrendingService.getSearching('query');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/search/multi?query=query&include_adult=false&language=en-US&page=1',
            expect.anything()
        );
        expect(result).toEqual(mockData.results);
    });

    test('getCreditDetails should fetch movie credit details', async () => {
        const mockData = { id: 123, cast: [{ id: 1, name: 'Actor 1' }] };
        mockFetchResponse(mockData);

        const result = await TrendingService.getCreditDetails(123, 'movie');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/movie/123/credits',
            expect.anything()
        );
        expect(result).toEqual(mockData);
    });

    test('getDatabaseData should return empty array on fetch failure', async () => {
        (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

        const result = await TrendingService.getDatabaseData('https://invalid-url');

        expect(result).toEqual([]);
    });
});
