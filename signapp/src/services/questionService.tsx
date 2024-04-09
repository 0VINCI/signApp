import axios from 'axios';
import { Question } from '../Models/Question';

const apiUrl = process.env.REACT_APP_API_URL;

export const getQuestion = async (level: string): Promise<Question> => {
try {
    const response = await axios.get(`${apiUrl}/getQuestion/${level}`);
    return response.data;
  } catch(error){
    console.log('Blad podczas nawiazywania polaczenia z api', error);
    throw error;
}
}