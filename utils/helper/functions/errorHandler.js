// export const errorHandler = (error) => {
//   const { response } = error;
//   const { data } = response;

//   if (response) {
//     const { code, message } = data.error;

//     return {
//       code,
//       message: message,
//     };
//   }
// };

export const errorHandler = (error) => {
  if (error && error.response) {
    const { status, statusText, data } = error.response;
    // const isClientError = status >= 400 && status <= 499;
    // const isServerError = status >= 500 && status <= 599;
    const statusCode = data?.error?.status_code;
    const errorMessage =
      data?.error?.message ?? statusText;

    return {
      // isClientError,
      // isServerError,
      statusText,
      statusCode,
      errorMessage,
    };
  }
};

export const handleResponseError = (
  res,
  statusCode,
  localizedMessage,
  serverErrorMessage
) => {
  const errorResponse = {
    error: {
      status_code: statusCode,
      message: localizedMessage,
      serverErrorMessage:
        process.env.NODE_ENV === 'development' ? serverErrorMessage : undefined,
    },
  };

  return res.status(statusCode).json(errorResponse);
};
