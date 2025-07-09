import { Component, inject } from '@angular/core';
import { OmdbService } from '../../services/omdb';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { OmdbSearchResult } from '../../models/omdb.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private omdbService = inject(OmdbService);
  private searchSubject = new Subject<string>();

  results$: Observable<OmdbSearchResult[]>;
  query: string = '';
  loading = false;
  noResults = false;

  constructor() {
    this.results$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.loading = true;
        this.noResults = false;
      }),
      switchMap((query) => this.omdbService.search(query)),
      tap((results) => {
        this.loading = false;
        this.noResults = this.query.length >= 3 && results.length === 0;
      })
    );
  }

  search() {
    this.searchSubject.next(this.query.trim());
  }
}

