import { Component, input } from '@angular/core';
import { Episode } from '../../../core/models/episode.model';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss'
})
export class EpisodeCardComponent {
  episode = input.required<Episode>();
}
