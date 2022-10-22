const getLocalStorage = key => {
  const data = localStorage.getItem(key) || []
  return JSON.parse(data);
};

export { getLocalStorage };
