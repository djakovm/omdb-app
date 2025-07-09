import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/omdb';
import { Observable, switchMap, tap } from 'rxjs';
import { OmdbItem } from '../../models/omdb.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episode-detail',
  imports: [CommonModule, AsyncPipe, RouterModule],
  templateUrl: './episode-detail.html',
  styleUrl: './episode-detail.css',
})
export class EpisodeDetail implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly omdbService = inject(OmdbService);

  episode$!: Observable<OmdbItem>;
  episodeDetail = history.state;
  season = '';
  episodeNumber = '';
  fromShowId = history.state.fromShowId;


  ngOnInit() {

    this.episode$ = this.activatedRoute.paramMap.pipe(
      tap((params) => {
        this.season = params.get('season')!;
        this.episodeNumber = params.get('episode')!;
      }),
      switchMap((params) => {
        const imdbID = params.get('id')!;
        return this.omdbService.getById(imdbID);
      })
    );
  }
}
