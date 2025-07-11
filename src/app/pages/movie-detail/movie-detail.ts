import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { OmdbService } from '../../services/omdb';
import { Observable, switchMap } from 'rxjs';
import { OmdbItem } from '../../models/omdb.model';
import { TitleDetail } from '../title-detail/title-detail';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, RouterModule, TitleDetail],
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly omdbService = inject(OmdbService);

  movie$!: Observable<OmdbItem>;

  ngOnInit() {
    this.movie$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        return this.omdbService.getById(id!);
      })
    );
  }
}
