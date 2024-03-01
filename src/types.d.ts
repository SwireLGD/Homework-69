export interface Show {
    id: number;
    name: string;
  }
  
  export interface ShowDetails {
    id: number;
    name: string;
    summary: string;
    genres: string[];
    type: string;
    language: string;
    status: string;
    premiered: number;
    image: { medium: string };
  }
  
  export interface TVShowsState {
    shows: Show[];
    selectedShow: ShowDetails | null;
  }