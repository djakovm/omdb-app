import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmdbItem } from '../../models/omdb.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-title-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './title-detail.html',
})
export class TitleDetail {
  @Input() item!: OmdbItem;
}
