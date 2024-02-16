export const errorHandler = (error) => {
  const { response } = error;
  const { status, data } = response;

  if (response) {
    const { code, message } = data.error;

    return {
      code,
      message: message,
    };
  }
};
