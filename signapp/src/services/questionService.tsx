import axios from 'axios';
import { Question } from '../Models/Question';
import { CheckAnswer } from '../Models/checkAnswer';
import { CameraQuestion } from '../Models/CameraQuestion';

const apiUrl = process.env.REACT_APP_API_URL;

export const easyQuestion = async (): Promise<Question> => {
try {
    const response = await axios.get(`${apiUrl}/getQuestion/1`,{
      withCredentials: true
    });
    return response.data;
  } catch(error){
    console.log('Blad podczas nawiazywania polaczenia z api', error);
    throw error;
}
}

export const cameraQuestion = async (level: number): Promise<CameraQuestion> => {
  try {
      const response = await axios.get(`${apiUrl}/cameraQuestion/${level}`,{
        withCredentials: true
      });
      return response.data;
    } catch(error){
      console.log('Blad podczas nawiazywania polaczenia z api', error);
      throw error;    
  }
}
  

export const checkAnswer = async (checkAnswer: CheckAnswer) => {
  try {
    const response = await axios.post(`${apiUrl}/checkAnswer`, checkAnswer,{
      withCredentials: true
    });
    return response.data.isCorrect;
  } catch (error) {
    console.error('Błąd podczas sprawdzania odpowiedzi', error);
    throw error;
  }
};