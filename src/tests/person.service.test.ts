import { TrendingService } from '../service/trending.service';

describe('TrendingService - Person Details', () => {
    it('should fetch person details', async () => {
        const personId = 287; // Example person ID (Brad Pitt)
        const person = await TrendingService.getPersonDetails(personId);
        expect(person).toBeDefined();
        expect(person.id).toBe(personId);
        expect(person.name).toBe('Brad Pitt');
    });

    it('should fetch person movie credits', async () => {
        const personId = 287; // Example person ID (Brad Pitt)
        const movieCredits = await TrendingService.getPersonMovieCredits(personId);
        expect(movieCredits).toBeDefined();
        expect(movieCredits.cast).toBeDefined();
        expect(movieCredits.cast.length).toBeGreaterThan(0);
    });
});
