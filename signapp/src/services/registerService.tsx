import axios from 'axios';
import { User } from '../Models/User';

const apiUrl = process.env.REACT_APP_API_URL;

export const userRegister = async (user:User) => {
    const response = await axios.post(`${apiUrl}/register`, user);
    return response;
};
