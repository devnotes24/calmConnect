
import api from './api';
// import axios from 'axios';

export async function register({ name , lastName , email, password }) {
  try {

    const response = await api.post('regLoginRt/register', {
      name,
      lastName,
      email,
      password,
    }, {
      withCredentials: true // Include cookies in the request
    });

    if (response.data.error) {
      console.log('registration failed:', response.data.error);
      throw new Error(response.data.error); // Throw error to handle in the component
    }


    return response.data;
  } catch (error) {
    console.error('There was an error sign up:', error);
    throw error; // Rethrow error to handle in the component
  }
}
export async function userUpdate({ name , lastName , email, password }) {
  try {

    const response = await api.put('regLoginRt/updateUser', {
      name,
      lastName,
      email,
      password,
    });

    if (response.data.error) {
      console.log('Update failed:', response.data.error);
      throw new Error(response.data.error); // Throw error to handle in the component
    }

    return response;
  } catch (error) {
    console.error('There was an error Update:', error);
    throw error; // Rethrow error to handle in the component
  }
}
