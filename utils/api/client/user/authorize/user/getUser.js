export const getUser = async (userId) => {
  try {
    const url = `/api/users?userId=${userId}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Something went wrong.');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
