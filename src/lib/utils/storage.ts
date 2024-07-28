export const setStorage = <T>(key: string, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

export const removeStorage = (key: string) => localStorage.removeItem(key);

export const clearStorage = () => localStorage.clear();

export const getStorage = (key: string) => localStorage.getItem(key);
