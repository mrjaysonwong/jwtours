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

    if (res.status === 404) {
      throw new Error('An error occured. Please try again.');
    }

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
