import { configureStore } from '@reduxjs/toolkit';
import TVShowReducer from '../Containers/TVShow/TVShowSlice';

export const store = configureStore({
  reducer: {
    TVShow: TVShowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;