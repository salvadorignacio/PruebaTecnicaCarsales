import { Component, computed, inject, signal } from '@angular/core';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EpisodeService } from '../../../services/episode.service';
import { EpisodeFilter, PagedResult, Episode } from '../../../core/models/episode.model';
import { EpisodeCardComponent } from '../episode-card/episode-card.component';
import { EpisodeFilterComponent } from '../episode-filter/episode-filter.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [
    EpisodeCardComponent,
    EpisodeFilterComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss'
})
export class EpisodeListComponent {
  private readonly episodeService = inject(EpisodeService);

  filter = signal<EpisodeFilter>({ page: 1 });
  isLoading = signal(false);
  error = signal<string | null>(null);

  private result$ = toObservable(this.filter).pipe(
    switchMap(f => {
      this.isLoading.set(true);
      this.error.set(null);
      return this.episodeService.getEpisodes(f).pipe(
        catchError(() => {
          this.error.set('No se encontraron episodios. Intentá con otros filtros.');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      );
    })
  );

  result = toSignal<PagedResult<Episode> | null>(this.result$, { initialValue: null });

  episodes = computed(() => this.result()?.results ?? []);
  totalPages = computed(() => this.result()?.pages ?? 0);
  totalCount = computed(() => this.result()?.count ?? 0);
  currentPage = computed(() => this.filter().page);

  onFilterChange(newFilter: EpisodeFilter): void {
    this.filter.set(newFilter);
  }

  onPageChange(page: number): void {
    this.filter.update(f => ({ ...f, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
