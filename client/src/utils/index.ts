const sanitizeObject = (data: object): object => {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ""));
};

const convetBlankToDash = (data: string | number) => {
  if (data == null) {
    return "-";
  }
  return data;
};
export { sanitizeObject, convetBlankToDash };
