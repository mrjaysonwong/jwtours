export const errorHandler = (error) => {
  const { response } = error;
  const { status } = response;
  const code = response.data.error?.code;
  const message = response.data.error?.message;


  if (status !== 200 || status !== 201) {
    return {
      code,
      message: message ?? `Bad Request: Your request was invalid.`,
    };
  }
};
