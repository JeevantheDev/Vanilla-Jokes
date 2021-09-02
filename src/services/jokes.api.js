import { BASE_URL } from '../env/constant';
import { http } from './http';

// fetch all jokes
export const getAllJokes = async () => {
  return await http.get(`${BASE_URL}/allJokes`);
};

// create a new Joke
export const createJoke = async (data) => {
  return await http.post(`${BASE_URL}/create`, data);
};

// Update a joke
export const updateJoke = async (data) => {
  return await http.post(`${BASE_URL}/update`, data);
};

// Delete a joke
export const deleteJoke = async (data) => {
  return await http.post(`${BASE_URL}/delete`, data);
};

// Add like or dislike a joke
export const addLikeOrDislike = async (data) => {
  return await http.post(`${BASE_URL}/addReview`, data);
};
