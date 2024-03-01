import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

interface Show {
  id: number;
  name: string;
}

interface Response {
    show: Show;
}

interface ShowDetails {
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

interface TVShowsState {
  shows: Show[];
  selectedShow: ShowDetails | null;
}

const initialState: TVShowsState = {
  shows: [],
  selectedShow: null
};

export const fetchShows = createAsyncThunk<Show[], string>(
  'TVShows/fetchShows',
  async (show: string) => {
    const response = await axiosApi.get(`/search/shows?q=${show}`);
    return response.data.map((item: Response) => item.show);
});

export const fetchShowDetails = createAsyncThunk<ShowDetails, number>(
    'tvShows/fetchShowDetails',
    async (showId: number) => {
        const response = await axiosApi.get<ShowDetails>(`/shows/${showId}`);
        return response.data;
    }
);

const TVShowsSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchShows.fulfilled, (state, action) => {
            state.shows = action.payload;
        })
        .addCase(fetchShowDetails.pending, (state) => {
            state.selectedShow = null;
        })
        .addCase(fetchShowDetails.fulfilled, (state, action) => {
            state.selectedShow = action.payload;
        });
    },
});

export default TVShowsSlice.reducer;