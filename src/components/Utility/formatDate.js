export const getDateFromISODate = (ISODate) => {
  const date = new Date(ISODate);
  const string = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  return string;
};

export const getTimeFromISODate = (ISODate) => {
  const date = new Date(ISODate);
  const string = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return string;
};
