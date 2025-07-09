import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { ShowDetail } from './pages/show-detail/show-detail';
import { EpisodeDetail } from './pages/episode-detail/episode-detail';

export const routes: Routes = [
  { path: '', component: Home, title: 'Omdb Home' },
  { path: 'movies/:id', component: MovieDetail, title: 'Movie Details' },
  { path: 'series/:id', component: ShowDetail, title: 'Series Details' },
  {
    path: 'shows/:id/episode/:season/:episode',
    component: EpisodeDetail,
    title: 'Episode Details',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
