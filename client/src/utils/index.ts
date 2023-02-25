const sanitizeObject = (data: object): object => {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ""));
};

export { sanitizeObject };
