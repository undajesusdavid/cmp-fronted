export const defaultError = {
  message: "Error de servidor",
  status: 500,
};

export const structError = (error) => {
  const err = error?.response?.data || defaultError;
  return {
    message: err.message,
    status: err.status,
  };
};
