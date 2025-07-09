import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  OmdbSearchResponse,
  OmdbSearchResult,
  OmdbSeasonResponse,
} from '../models/omdb.model';
import { OmdbItem } from '../models/omdb.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private baseUrl = 'https://www.omdbapi.com/';
  private apiKey = environment.omdbApiKey;

  constructor(private http: HttpClient) {}

  search(query: string): Observable<OmdbSearchResult[]> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${encodeURIComponent(
      query
    )}`;
    console.log(`Searching OMDB with URL: ${url}`);

    return this.http
      .get<OmdbSearchResponse>(url)
      .pipe(map((response) => response.Search || []));
  }

  getById(id: string): Observable<OmdbItem> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${id}&plot=full`;

    console.log(`Fetching OMDB item by ID with URL: ${url}`);
    return this.http.get<OmdbItem>(url);
  }

  getSeasonEpisodes( imdbId: string, season: number): Observable<OmdbSeasonResponse> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${imdbId}&Season=${season}`;

    console.log(`Fetching OMDB season episodes with URL: ${url}`);
    return this.http.get<OmdbSeasonResponse>(url);
  }
}
