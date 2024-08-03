const STORAGE_KEY = 'userData';

export const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData? JSON.parse(storedData) : null;
  
};

export const saveToLocalStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};