export interface MovieInterface {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
}

export interface MoviesState {
    movies: {
        results: MovieInterface[];
        total_pages: number;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}