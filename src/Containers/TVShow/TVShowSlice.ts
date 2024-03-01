import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

interface Show {
  id: number;
  name: string;
}

interface Response {
    show: Show;
  }

interface TVShowsState {
  shows: Show[];
}

const initialState: TVShowsState = {
  shows: [],
};

export const fetchShows = createAsyncThunk<Show[], string>(
  'tvShows/fetchShows',
  async (show: string) => {
    const response = await axiosApi.get(`/search/shows?q=${show}`);
    return response.data.map((item: Response) => item.show);
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
      });
  },
});

export default TVShowsSlice.reducer;