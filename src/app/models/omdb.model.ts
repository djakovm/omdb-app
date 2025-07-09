export interface OmdbSearchResponse {
  Search: OmdbSearchResult[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface OmdbSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface OmdbItem {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbID: string;
  Type: string;
  totalSeasons?: string;
}
