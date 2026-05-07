import { Component, OnDestroy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterFilter } from '../../../core/models/character.model';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss'
})
export class CharacterFilterComponent implements OnDestroy {
  filterChange = output<CharacterFilter>();

  name = signal('');
  status = signal('');
  species = signal('');
  gender = signal('');

  readonly statuses = [
    { value: 'alive', label: 'Vivo' },
    { value: 'dead', label: 'Muerto' },
    { value: 'unknown', label: 'Desconocido' }
  ];

  readonly genders = [
    { value: 'female', label: 'Femenino' },
    { value: 'male', label: 'Masculino' },
    { value: 'genderless', label: 'Sin género' },
    { value: 'unknown', label: 'Desconocido' }
  ];

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  onInputChange(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.emit(), 400);
  }

  onSelectChange(): void {
    this.emit();
  }

  clearFilters(): void {
    this.name.set('');
    this.status.set('');
    this.species.set('');
    this.gender.set('');
    this.filterChange.emit({ page: 1 });
  }

  get hasActiveFilters(): boolean {
    return !!(this.name() || this.status() || this.species() || this.gender());
  }

  private emit(): void {
    this.filterChange.emit({
      page: 1,
      name: this.name() || undefined,
      status: this.status() || undefined,
      species: this.species() || undefined,
      gender: this.gender() || undefined
    });
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }
}
