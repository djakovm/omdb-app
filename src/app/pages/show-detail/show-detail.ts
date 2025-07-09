import { Component, inject, OnInit } from '@angular/core';
import { OmdbService } from '../../services/omdb';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { CommonModule, AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { OmdbItem, OmdbSeasonResponse } from '../../models/omdb.model';
import { Observable } from 'rxjs';
import { TitleDetail } from '../title-detail/title-detail';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    RouterModule,
    TitleDetail,
  ],
  templateUrl: './show-detail.html',
  styleUrl: './show-detail.css',
})
export class ShowDetail implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly omdbService = inject(OmdbService);

  show$!: Observable<OmdbItem>;

  seasonOptions: number[] = [];
  selectedSeason = '';
  episodes: OmdbSeasonResponse['Episodes'] = [];
  currentShowId = '';

  ngOnInit() {
    this.show$ = this.activatedRoute.paramMap.pipe(
      tap((params) => {
        this.currentShowId = params.get('id')!;
      }),
      switchMap((params) => {
        const id = params.get('id');
        return this.omdbService.getById(id!);
      }),
      tap((show) => {
        if (show.totalSeasons) {
          this.loadSeasons(show.totalSeasons);
        }
      })
    );
  }

  loadSeasons(totalSeasons: string) {
  const count = parseInt(totalSeasons, 10);
  this.seasonOptions = [];
  for (let i = 1; i <= count; i++) {
    this.seasonOptions.push(i);
  }
}

  onSeasonSelect(season: string) {
    this.selectedSeason = season;
    this.omdbService
      .getSeasonEpisodes(this.currentShowId, +season)
      .subscribe((response) => {
        this.episodes = response.Episodes;
        console.log(`Fetched episodes for season ${season}:`, this.episodes);

      });
  }
}
