import axios from 'axios';
import { ScoreBoard } from '../Models/ScoreBoard';

const apiUrl = process.env.REACT_APP_API_URL;
const ERROR_MESSAGE = 'Blad podczas nawiazywania polaczenia z api'


export const getScoreBoard = async(): Promise<ScoreBoard> => {
    try{
        const response = await axios.get(`${apiUrl}/getScoreBoard`,{
            withCredentials: true
          });
        return response.data;
    }
    catch(error){
        console.log(ERROR_MESSAGE);
        throw error;
    }
}