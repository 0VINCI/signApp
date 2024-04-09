import { createSlice } from '@reduxjs/toolkit';
import { ScoreBoard } from '../Models/ScoreBoard';
import { RootState } from '../store';
import { getScoreBoard } from '../services/scoreBoardService';

export interface ScoreBoardState {
    data: ScoreBoard[];
    isLoading: boolean;
    loadError: Object | null;
}

const initialState: ScoreBoardState = {
    data: [],
    isLoading: false,
    loadError: null
}

export const scoreBoardSlice = createSlice({
    name: 'scoreBoard',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
            builder.addCase(getScoreBoard.pending, (state) => {
            state.loadError = null;
            state.isLoading = true;
        })

        builder.addCase(getScoreBoard.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.isLoading = false;
        })

        builder.addCase(getScoreBoard.rejected, (state, payload : any) => {
            state.loadError = payload;
            state.isLoading = false;
        })
    }
})

export const fetchScoreBoard = (state: RootState) => state.scoreBoard.data;
export const isLoading = (state: RootState) => state.scoreBoard.isLoading;

export default scoreBoardSlice.reducer;