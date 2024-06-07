import { createSlice } from '@reduxjs/toolkit';
import { TemporaryScore } from '../Models/TemporaryScore'; 
import { RootState } from '../store';
import { sendTemporaryScore } from '../services/temporaryScoreService';

export interface TemporaryScoreState {
    userId: number;
    data: TemporaryScore;
    isLoading: boolean;
    sendError: Object | null;
}

const initialState: TemporaryScoreState = {
    userId: -1,
    data: {
        levelId: -1,
        correctAnswers: 0,
        allAnswers: 0
    },
    isLoading: false,
    sendError: null
}

export const temporaryScoreSlice = createSlice({
    name: 'temporaryScore',
    initialState,
    reducers: {
        updateUserId: (state, action) => {
            state.userId = action.payload;
        },
        incrementCorrectandAllAnswer: (state, action) => {
            state.data.levelId = action.payload.levelId;
            state.data.correctAnswers += 1;
            state.data.allAnswers += 1;
        },
        incrementAllAnswer: (state, action) => {
            state.data.levelId = action.payload.levelId;
            state.data.allAnswers += 1;
        },
        clearData: (state) => {
            state.data = {
                levelId: -1,
                correctAnswers: 0,
                allAnswers: 0
            };
        },
        clearAll: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendTemporaryScore.pending, (state) => {
            state.isLoading = true;
            state.sendError = null;
        });

        builder.addCase(sendTemporaryScore.fulfilled, (state) => {
            state.isLoading = false;
        });

        builder.addCase(sendTemporaryScore.rejected, (state, action) => { 
            state.isLoading = false;
            state.sendError = action.error.message || "Unknown error";
        });
    }
});

export const { updateUserId, incrementCorrectandAllAnswer, incrementAllAnswer, clearData, clearAll } = temporaryScoreSlice.actions;
export const isLoading = (state: RootState) => state.temporaryScore.isLoading;

export default temporaryScoreSlice.reducer;
