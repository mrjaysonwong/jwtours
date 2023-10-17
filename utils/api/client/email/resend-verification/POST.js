export async function methodPOST(email) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(
    `/api/auth/resend-verification?email=${email}`,
    options
  );

  if (res.status === 404) {
    throw new Error('Not Found: The requested resource was not found.');
  } else if (res.status === 400) {
    throw new Error('Bad Request: Your request was invalid.');
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
