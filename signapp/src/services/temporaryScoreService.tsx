import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { clearData } from '../slice/temporaryScoreSlice';
import { post } from '../api/applicationHttpClient';

export const sendTemporaryScore = createAsyncThunk(
    'temporaryScore/sendTemporaryScore',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const data = state.temporaryScore.data; 

        try {
            const response = await post(`/sendTemporaryScore`, data)
            if (response.status === 200) {
                thunkApi.dispatch(clearData());
                return response.data;
            }
            throw new Error("Wystąpił nieoczekiwany błąd!")
            
        } catch (error: any) {
            thunkApi.dispatch(clearData());
            return thunkApi.rejectWithValue({
                message: error.response?.data?.message || "Wystąpił nieoczekiwany błąd!"
            });
        }
    }
);