export const createUser = async (values) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    const res = await fetch(`/api/auth/signup`, options);

    // Unprocessable Content
    if (res.status === 422) {
      throw new Error('Email Already Exists.');
    } else if (!res.ok) {
      throw new Error('An error occurred. Please Try again.');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
