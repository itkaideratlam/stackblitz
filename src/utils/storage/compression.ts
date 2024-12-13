import { encode, decode } from './base64';

export const compress = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    return encode(jsonString);
  } catch (error) {
    console.error('Error compressing data:', error);
    return '';
  }
};

export const decompress = (compressed: string): any => {
  if (!compressed) return null;
  
  try {
    const jsonString = decode(compressed);
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (error) {
    console.error('Error decompressing data:', error);
    return null;
  }
};