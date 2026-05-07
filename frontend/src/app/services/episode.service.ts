import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Episode, EpisodeFilter, PagedResult } from '../core/models/episode.model';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/episodes`;

  getEpisodes(filter: EpisodeFilter): Observable<PagedResult<Episode>> {
    let params = new HttpParams().set('page', filter.page);
    if (filter.name) params = params.set('name', filter.name);
    if (filter.episode) params = params.set('episode', filter.episode);

    return this.http.get<PagedResult<Episode>>(this.apiUrl, { params });
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }
}
