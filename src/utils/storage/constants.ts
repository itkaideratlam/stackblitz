export const STORAGE_VERSION = '1.0.0';
export const STORAGE_KEY = 'questionBank';
export const CHUNK_PREFIX = 'qb_chunk_';
export const MAX_CHUNK_SIZE = 512 * 1024; // 512KB chunks for better browser compatibility
export const SAVE_DELAY = 1000; // 1 second debounce