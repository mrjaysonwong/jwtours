export async function methodPUT(email, token) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = `/api/verify?email=${email}&token=${token}`;

  const res = await fetch(url, options);

  // if resource url incorrect/not found
  if (res.status === 404) {
    throw new Error('Not Found: The requested resource was not found.');
  }

  const data = await res.json();

  if (!res.ok) {
    return {
      error: {
        code: data.error.code,
        message: data.error.message,
      },
    };
  }

  return data;
}