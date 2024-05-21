import axios from 'axios';
import { User } from '../Models/User';

const apiUrl = process.env.REACT_APP_API_URL;

export const userLogin = async (user: User): Promise<{ userId?: string, error?: string }> => {
  try {
    const response = await axios.post(`${apiUrl}/login`, user, {
      withCredentials: true
    });
    if (response.status === 200 && response.data.userId) {
      return { userId: response.data.userId };
    } else {
      // Jeśli odpowiedź jest 200 ale brak userId lub inne statusy 2XX
      return { error: 'Nieprawidłowa odpowiedź z serwera.' };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 403) {
        return { error: 'Nieprawidłowe dane logowania.' };
      } else {
        // Obsługa innych odpowiedzi 4XX/5XX
        return { error: 'Błąd podczas logowania: ' + (error.response.data.error || 'Nieznany błąd') };
      }
    } else {
      // Błąd sieciowy lub inny błąd po stronie klienta
      console.log('Błąd podczas nawiązywania połączenia z API', error);
      throw new Error('Błąd sieci: Nie można nawiązać połączenia z API.');
    }
  }
}
