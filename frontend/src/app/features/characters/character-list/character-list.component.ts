import { Component, computed, inject, signal } from '@angular/core';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CharacterService } from '../../../services/character.service';
import { Character, CharacterFilter } from '../../../core/models/character.model';
import { PagedResult } from '../../../core/models/episode.model';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { CharacterFilterComponent } from '../character-filter/character-filter.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CharacterCardComponent,
    CharacterFilterComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {
  private readonly characterService = inject(CharacterService);

  filter = signal<CharacterFilter>({ page: 1 });
  isLoading = signal(false);
  error = signal<string | null>(null);

  private result$ = toObservable(this.filter).pipe(
    switchMap(f => {
      this.isLoading.set(true);
      this.error.set(null);
      return this.characterService.getCharacters(f).pipe(
        catchError(() => {
          this.error.set('No se encontraron personajes. Intentá con otros filtros.');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      );
    })
  );

  result = toSignal<PagedResult<Character> | null>(this.result$, { initialValue: null });

  characters = computed(() => this.result()?.results ?? []);
  totalPages = computed(() => this.result()?.pages ?? 0);
  totalCount = computed(() => this.result()?.count ?? 0);
  currentPage = computed(() => this.filter().page);

  onFilterChange(newFilter: CharacterFilter): void {
    this.filter.set(newFilter);
  }

  onPageChange(page: number): void {
    this.filter.update(f => ({ ...f, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
