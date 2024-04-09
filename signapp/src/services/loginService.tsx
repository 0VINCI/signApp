import axios from 'axios';
import { User } from '../Models/User';

const apiUrl = process.env.REACT_APP_API_URL;

export const userLogin = async (user: User): Promise<User> => {
try {
    const response = await axios.post(`${apiUrl}/login`, user);
    return response.data;
  } catch(error){
    console.log('Blad podczas nawiazywania polaczenia z api', error);
    throw error;
}
}