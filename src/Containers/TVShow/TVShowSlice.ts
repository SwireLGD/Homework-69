import { createSlice } from '@reduxjs/toolkit';
import { fetchShows, fetchShowDetails } from './TVShowThunks';
import { TVShowsState } from '../../types';


const initialState: TVShowsState = {
  shows: [],
  selectedShow: null,
};

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