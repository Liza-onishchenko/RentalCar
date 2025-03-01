// src/utils/persist.js
const loadFromLocalStorage = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { loadFromLocalStorage, saveToLocalStorage };
