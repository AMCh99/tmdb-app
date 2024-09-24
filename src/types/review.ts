interface AuthorDetails {
    avatar_path: string;
    name: string;
    rating: number;
    username: string;
}

export interface Review {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}