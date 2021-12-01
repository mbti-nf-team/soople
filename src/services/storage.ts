export const CURRENT_USER = 'CURRENT_USER' as const;

export const saveItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadItem = (key: string) => {
  const item = localStorage.getItem(key);

  try {
    const parsed = JSON.parse(item || '');

    return parsed;
  } catch (error) {
    return null;
  }
};

export const removeItem = (key: string) => localStorage.removeItem(key);
