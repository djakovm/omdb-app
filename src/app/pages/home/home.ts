import { Component, inject } from '@angular/core';
import { OmdbService } from '../../services/omdb';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { OmdbSearchResult } from '../../models/omdb.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private omdbService = inject(OmdbService);
  private searchSubject = new Subject<string>();

  results$: Observable<OmdbSearchResult[]>;

  query: string = '';

  constructor() {
    this.results$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => this.omdbService.search(query))
    );
  }

  search() {
    this.searchSubject.next(this.query.trim());
  }
}
