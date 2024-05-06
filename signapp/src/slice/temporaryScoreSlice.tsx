import { createSlice } from '@reduxjs/toolkit';
import { TemporaryScore } from '../Models/TemporaryScore'; 
import { RootState } from '../store';
import { sendTemporaryScore } from '../services/temporaryScoreService';

export interface TemporaryScoreState {
    userId: number;
    data: TemporaryScore[];
    isLoading: boolean;
    sendError: Object | null;
}

const initialState: TemporaryScoreState = {
    userId: -1,
    data: [],
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
            const index = state.data.findIndex(score => score.levelId === action.payload.levelId);
            if (index !== -1) {
                state.data[index].correctAnswer += 1;
                state.data[index].allAnswer += 1;
            }
            else{
                state.data.push({
                    levelId: action.payload.levelId,
                    correctAnswer: 1,
                    allAnswer: 1
                });
            }
        },
        incrementAllAnswer: (state, action) => {
            const index = state.data.findIndex(score => score.levelId === action.payload.levelId);
            if (index !== -1) {
                state.data[index].allAnswer += 1;
            }
            else{
                state.data.push({
                    levelId: action.payload.levelId,
                    correctAnswer: 0,
                    allAnswer: 1
                });
            }
        },
        clearData: (state) => {
            state.data = [];
        },
        clearAll: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
            builder.addCase(sendTemporaryScore.pending, (state) => {
            state.isLoading = true;
            state.sendError = null;
        })

        builder.addCase(sendTemporaryScore.fulfilled, (state) => {
            state.isLoading = false;
        })

        builder.addCase(sendTemporaryScore.rejected, (state, action) => { 
            state.isLoading = false;
            state.sendError = action.error.message || "Unknown error";
        })
    }
})
export const { updateUserId, incrementCorrectandAllAnswer, incrementAllAnswer, clearData, clearAll } = temporaryScoreSlice.actions;
export const isLoading = (state: RootState) => state.temporaryScore.isLoading;

export default temporaryScoreSlice.reducer;