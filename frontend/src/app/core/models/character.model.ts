export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  originName: string;
  locationName: string;
  image: string;
  episodeCount: number;
}

export interface CharacterFilter {
  page: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}
