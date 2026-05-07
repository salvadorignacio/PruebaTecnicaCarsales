export interface Episode {
  id: number;
  name: string;
  airDate: string;
  episodeCode: string;
  characters: string[];
}

export interface PagedResult<T> {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  results: T[];
}

export interface EpisodeFilter {
  page: number;
  name?: string;
  episode?: string;
}
