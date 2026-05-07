import { Component, OnDestroy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EpisodeFilter } from '../../../core/models/episode.model';

@Component({
  selector: 'app-episode-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './episode-filter.component.html',
  styleUrl: './episode-filter.component.scss'
})
export class EpisodeFilterComponent implements OnDestroy {
  filterChange = output<EpisodeFilter>();

  name = signal('');
  episodeCode = signal('');

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  onInputChange(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.filterChange.emit({
        page: 1,
        name: this.name(),
        episode: this.episodeCode()
      });
    }, 400);
  }

  clearFilters(): void {
    this.name.set('');
    this.episodeCode.set('');
    this.filterChange.emit({ page: 1 });
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }
}
