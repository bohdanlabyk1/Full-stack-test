// src/api/taskApi.ts
import axios, { AxiosError } from 'axios';


const API_URL = 'http://localhost:3001/tasks'; // Заміни на URL твого бекенду

export const createStripeSession = async (userId: string) => {
  const response = await axios.post('http://localhost:3001/stripe/create-checkout-session', { userId });
  return response.data.url;
}
// Отримати всі задачі
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Додати нову задачу
export const addTask = async (task: { title: string; description: string }) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Активація преміум-акаунту
export const activatePremium = async (userId: string) => {
  try {
    const response = await axios.post(`/payments/activate-premium/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response ? error.response.data : error.message;
    } else {
      throw error;
    }
  }
};
export const createPaymentIntent = async (amount: number) => {
  try {
    const response = await axios.post('/payments', { amount });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response ? error.response.data : error.message;
    } else {
      throw error;
    }
  }
};



// Видалити задачу
export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
