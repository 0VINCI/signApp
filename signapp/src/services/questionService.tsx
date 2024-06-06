import { Question } from '../Models/Question';
import { CheckAnswer } from '../Models/checkAnswer';
import { Level } from '../Models/Level';
import { get, post } from '../api/applicationHttpClient';


export const getQuestion = async (levelId: Level): Promise<Question> => {
    const response = await get<Question>(`getQuestion/${levelId}`);
    return response.data;
}

export const checkAnswer = async (checkAnswer: CheckAnswer): Promise<any> => {
    const response = await post<any>(`/checkAnswer`, checkAnswer)
return response.data; 
}