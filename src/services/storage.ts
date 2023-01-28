export const saveItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadItem = <T>(key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const item = localStorage.getItem(key);
    const parsed = JSON.parse(item || '') as T | null;

    return parsed;
  } catch (error) {
    return null;
  }
};

export const removeItem = (key: string) => localStorage.removeItem(key);
