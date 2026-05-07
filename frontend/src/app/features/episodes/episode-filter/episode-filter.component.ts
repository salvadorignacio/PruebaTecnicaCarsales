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
  season = signal('');

  readonly seasons = [
    { value: 'S01', label: 'Temporada 1' },
    { value: 'S02', label: 'Temporada 2' },
    { value: 'S03', label: 'Temporada 3' },
    { value: 'S04', label: 'Temporada 4' },
    { value: 'S05', label: 'Temporada 5' },
    { value: 'S06', label: 'Temporada 6' },
    { value: 'S07', label: 'Temporada 7' },
  ];

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  onNameChange(value: string): void {
    this.name.set(value);
    this.emitWithDebounce();
  }

  onEpisodeCodeChange(value: string): void {
    this.episodeCode.set(value);
    this.season.set('');
    this.emitWithDebounce();
  }

  onSeasonChange(value: string): void {
    this.season.set(value);
    this.episodeCode.set('');
    this.filterChange.emit({
      page: 1,
      name: this.name(),
      episode: value || undefined
    });
  }

  clearFilters(): void {
    this.name.set('');
    this.episodeCode.set('');
    this.season.set('');
    this.filterChange.emit({ page: 1 });
  }

  private emitWithDebounce(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.filterChange.emit({
        page: 1,
        name: this.name(),
        episode: this.episodeCode() || undefined
      });
    }, 400);
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }
}
