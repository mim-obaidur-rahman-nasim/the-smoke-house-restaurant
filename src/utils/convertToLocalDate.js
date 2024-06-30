export const convertToLocalDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleString(undefined, options);
};
