import { compressData, decompressData } from './compression';

const MAX_CHUNK_SIZE = 4 * 1024 * 1024; // 4MB chunks
const CHUNK_PREFIX = 'qb_chunk_';

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    const compressed = compressData(data);
    
    // If data is small enough, store it directly
    if (compressed.length < MAX_CHUNK_SIZE) {
      localStorage.setItem(key, compressed);
      return;
    }

    // Split into chunks
    const chunks = Math.ceil(compressed.length / MAX_CHUNK_SIZE);
    
    // Clear any existing chunks
    clearChunks(key);

    // Store metadata
    localStorage.setItem(`${key}_meta`, JSON.stringify({ chunks }));

    // Store chunks
    for (let i = 0; i < chunks; i++) {
      const start = i * MAX_CHUNK_SIZE;
      const end = start + MAX_CHUNK_SIZE;
      const chunk = compressed.slice(start, end);
      localStorage.setItem(`${CHUNK_PREFIX}${key}_${i}`, chunk);
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    // Remove partial data if save failed
    clearStorage(key);
  }
};

export const loadFromLocalStorage = (key: string): any => {
  try {
    // Check for chunked data
    const metaString = localStorage.getItem(`${key}_meta`);
    if (!metaString) {
      // Try loading as single item
      const compressed = localStorage.getItem(key);
      return compressed ? decompressData(compressed) : null;
    }

    // Load chunked data
    const { chunks } = JSON.parse(metaString);
    let compressed = '';
    
    for (let i = 0; i < chunks; i++) {
      const chunk = localStorage.getItem(`${CHUNK_PREFIX}${key}_${i}`);
      if (!chunk) throw new Error(`Missing chunk ${i}`);
      compressed += chunk;
    }

    return decompressData(compressed);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

const clearChunks = (key: string): void => {
  const metaString = localStorage.getItem(`${key}_meta`);
  if (!metaString) return;

  const { chunks } = JSON.parse(metaString);
  for (let i = 0; i < chunks; i++) {
    localStorage.removeItem(`${CHUNK_PREFIX}${key}_${i}`);
  }
  localStorage.removeItem(`${key}_meta`);
};

const clearStorage = (key: string): void => {
  localStorage.removeItem(key);
  clearChunks(key);
};