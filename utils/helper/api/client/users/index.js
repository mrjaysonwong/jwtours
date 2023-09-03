import { API_ENDPOINT } from '@utils/helper/apiEndPoint';

export const createUser = async (values) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    let response = await fetch(`api/auth/signup`, options);

    // Unprocessable Content
    if (response.status === 422) {
      throw new Error('Email Already Exists.');
    } else if (!response.ok) {
      throw new Error('An error occurred. Please Try again.');
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
