import axios from 'axios';

const apiUrl = 'http://127.0.0.1:5000';

export const sendPrediction = async (pointsMatrix: any) => {
  try {
    const response = await axios.post(`${apiUrl}/predict`, pointsMatrix);
    return response.data;
  } catch (error) {
    console.error('Error sending prediction:', error);
    throw error;
  }
};
