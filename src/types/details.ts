import { Cast } from './cast';
import { Crew } from './crew';

export interface Details {
    id:number,
    cast: Cast[]
    crew: Crew[]
}