export const updateUser = async (userId, values) => {
  try {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    const url = `/api/users?userId=${userId}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error('An error occurred. Please try again.');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
