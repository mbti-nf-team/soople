export const CURRENT_USER = 'CURRENT_USER' as const;

export const saveItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadItem = (key: string) => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const item = localStorage.getItem(key);
    const parsed = JSON.parse(item || '');

    return parsed;
  } catch (error) {
    return false;
  }
};

export const removeItem = (key: string) => localStorage.removeItem(key);
