import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

export function logout() {
    Cookies.remove('token');
    navigate('/');
}