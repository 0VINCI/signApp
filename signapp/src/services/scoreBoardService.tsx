import axios from 'axios';
import { ScoreBoard } from '../Models/ScoreBoard';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserHighScoreOnLevel } from '../Models/UserHighScoreOnLevel';

const apiUrl = process.env.REACT_APP_API_URL;
const ERROR_MESSAGE = 'Blad podczas nawiazywania polaczenia z api'

export const getScoreBoard = createAsyncThunk<ScoreBoard[], number>(
    'getScoreBoard',
    async (type: number, thunkApi) => {
        const response = await axios.get(`${apiUrl}/getScoreBoard`); 
    if (response === undefined) {
        return thunkApi.rejectWithValue({
            message: ERROR_MESSAGE
        });
    } else {
        return response.data;
    }
});

export const getHighScore = async(level: string, login: string): Promise<UserHighScoreOnLevel> => {
    try{
        const response = await axios.get(`${apiUrl}/getScore/${level}/${login}`);
        return response.data;
    }
    catch(error){
        console.log(ERROR_MESSAGE);
        throw error;
    }
}