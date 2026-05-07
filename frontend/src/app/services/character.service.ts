import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Character, CharacterFilter } from '../core/models/character.model';
import { PagedResult } from '../core/models/episode.model';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/characters`;

  getCharacters(filter: CharacterFilter): Observable<PagedResult<Character>> {
    let params = new HttpParams().set('page', filter.page);
    if (filter.name) params = params.set('name', filter.name);
    if (filter.status) params = params.set('status', filter.status);
    if (filter.species) params = params.set('species', filter.species);
    if (filter.gender) params = params.set('gender', filter.gender);

    return this.http.get<PagedResult<Character>>(this.apiUrl, { params });
  }
}
