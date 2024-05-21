import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemporaryScore } from '../Models/TemporaryScore';
import { RootState } from '../store';
import { clearData } from '../slice/temporaryScoreSlice';

const apiUrl = process.env.REACT_APP_API_URL;
const ERROR_MESSAGE = 'Blad podczas nawiazywania polaczenia z api'

export const sendTemporaryScore = createAsyncThunk(
    'temporaryScore/sendTemporaryScore',
    async (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const { userId, data } = state.temporaryScore; 

        try {
            const response = await axios.post(`${apiUrl}/sendTemporaryScore`, { userId, data },{
                withCredentials: true
              });
            if (response.status !== 200) {
                thunkApi.dispatch(clearData());
                return thunkApi.rejectWithValue({
                    message: ERROR_MESSAGE
                });
            } else {
                return response.data;
            }
        } catch (error: any) {
            thunkApi.dispatch(clearData());
            return thunkApi.rejectWithValue({
                message: error.response?.data?.message || ERROR_MESSAGE
            });
        }
    }
);
