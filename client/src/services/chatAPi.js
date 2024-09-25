
// import api from './api';

import axios from "axios";

export async function getChat(email) {
  try {

    //   console.log(email);
    const response = await axios.post('http://localhost:8000/chatRt/getChat', {email});
    if (response.data.error) {
      console.log('Chat fetching failed:', response.data.error);
      throw new Error(response.data.error); // Throw error to handle in the component
    }


    return response;
  } catch (error) {
    console.error('There was an error in fetching the chat:', error);
    throw error; // Rethrow error to handle in the component
  }
}
export async function askQuestion(email , message) {
  try {

    const response = await axios.post('http://localhost:8000/chatRt/sendPrompt', {
      email,
      message,
    });

    if (response.data.error) {
      console.log('fetching failed:', response.data.error);
      throw new Error(response.data.error); // Throw error to handle in the component
    }

    return response;
  } catch (error) {
    console.error('There was an error in fetching data:', error);
    throw error; // Rethrow error to handle in the component
  }
}




export async function deleteChat(email) {
    try {
        const response = await axios.delete('http://localhost:8000/chatRt/clearChat', {
            data: { email } // Send email in the request body
        });

        if (response.data.error) {
            console.log('Clearing the chat failed:', response.data.error);
            throw new Error(response.data.error); // Throw error to handle in the component
        }

        return response; // Return the response data directly
    } catch (error) {
        console.error('There was an error in clearing the chat:', error);
        throw error; // Rethrow error to handle in the component
    }
}




// export async function deleteChat(email ) {
//   try {

//     const response = await axios.delete('http://localhost:8000/chatRt/clearChat', {
//       email
//     });

//     if (response.data.error) {
//       console.log('clearing the chat failed:', response.data.error);
//       throw new Error(response.data.error); // Throw error to handle in the component
//     }

//     return response;
//   } catch (error) {
//     console.error('There was an error in claering the chat:', error);
//     throw error; // Rethrow error to handle in the component
//   }
// }
