import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Show, ShowDetails } from '../../types';

interface Response {
    show: Show;
}

export const fetchShows = createAsyncThunk<Show[], string>(
    'TVShows/fetchShows',
    async (show: string) => {
        const response = await axiosApi.get(`/search/shows?q=${show}`);
        return response.data.map((item: Response) => item.show);
    }
);

export const fetchShowDetails = createAsyncThunk<ShowDetails, number>(
    'tvShows/fetchShowDetails',
    async (showId: number) => {
        const response = await axiosApi.get<ShowDetails>(`/shows/${showId}`);
        return response.data;
    }
);