export const getCities = async (value) => {
  // All public API Key must set in next.config to expose it to the browser

  try {
    const url = `https://api.api-ninjas.com/v1/city?name=${value}&limit=5`;

    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Api-Key': process.env.NINJA_KEY,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(errorText);

      throw new Error('An error occurred. Please try again.');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};
