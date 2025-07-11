import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

interface EpisodeState {
  fromShowId: string;
  episodeTitle: string;
  episodeReleased: string;
  episodeRating?: string;
  seasonNumber: string;
  episodeNumber: string;
  showTitle: string;
}

@Component({
  selector: 'app-episode-detail',
  imports: [CommonModule],
  templateUrl: './episode-detail.html',
})
export class EpisodeDetail implements OnInit {
  private readonly location = inject(Location);

  episodeState: EpisodeState = history.state as EpisodeState;
  season = '';
  episodeNumber = '';
  episodeTitle = '';
  episodeReleased = '';
  episodeRating = '';
  showTitle = '';

  ngOnInit() {
    if (this.episodeState) {
      this.episodeTitle = this.episodeState.episodeTitle;
      this.episodeReleased = this.episodeState.episodeReleased;
      this.episodeRating = this.episodeState.episodeRating || '';
      this.season = this.episodeState.seasonNumber;
      this.episodeNumber = this.episodeState.episodeNumber;
      this.showTitle = this.episodeState.showTitle;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
