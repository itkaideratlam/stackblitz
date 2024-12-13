// Simple base64 implementation for string compression
export const encode = (str: string): string => {
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.error('Error encoding string:', error);
    return '';
  }
};

export const decode = (str: string): string => {
  if (!str) return '';
  
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.error('Error decoding string:', error);
    return '';
  }
};