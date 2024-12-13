import { compress, decompress } from './compression';
import { StorageData, StorageMetadata } from './types';
import { CHUNK_PREFIX, MAX_CHUNK_SIZE } from './constants';

export class ChunkedStorage {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  save(data: StorageData): void {
    try {
      const compressed = compress(data);
      
      // If data is small enough, store it directly
      if (compressed.length < MAX_CHUNK_SIZE) {
        localStorage.setItem(this.key, compressed);
        this.clearChunks();
        return;
      }

      // Split into chunks
      const chunks = Math.ceil(compressed.length / MAX_CHUNK_SIZE);
      this.clearChunks();

      // Store metadata
      const metadata: StorageMetadata = {
        chunks,
        timestamp: Date.now(),
        version: data.version
      };
      
      localStorage.setItem(this.getMetadataKey(), JSON.stringify(metadata));

      // Store chunks
      for (let i = 0; i < chunks; i++) {
        const start = i * MAX_CHUNK_SIZE;
        const end = start + MAX_CHUNK_SIZE;
        const chunk = compressed.slice(start, end);
        localStorage.setItem(this.getChunkKey(i), chunk);
      }
    } catch (error) {
      console.error('Error saving to storage:', error);
      this.clear();
    }
  }

  load(): StorageData | null {
    try {
      // Check for chunked data
      const metadataString = localStorage.getItem(this.getMetadataKey());
      
      if (!metadataString) {
        // Try loading as single item
        const compressed = localStorage.getItem(this.key);
        return compressed ? decompress(compressed) : null;
      }

      // Load chunked data
      const metadata: StorageMetadata = JSON.parse(metadataString);
      let compressed = '';
      
      for (let i = 0; i < metadata.chunks; i++) {
        const chunk = localStorage.getItem(this.getChunkKey(i));
        if (!chunk) throw new Error(`Missing chunk ${i}`);
        compressed += chunk;
      }

      return decompress(compressed);
    } catch (error) {
      console.error('Error loading from storage:', error);
      return null;
    }
  }

  clear(): void {
    this.clearChunks();
    localStorage.removeItem(this.key);
  }

  private clearChunks(): void {
    const metadataString = localStorage.getItem(this.getMetadataKey());
    if (!metadataString) return;

    const metadata: StorageMetadata = JSON.parse(metadataString);
    for (let i = 0; i < metadata.chunks; i++) {
      localStorage.removeItem(this.getChunkKey(i));
    }
    localStorage.removeItem(this.getMetadataKey());
  }

  private getMetadataKey(): string {
    return `${this.key}_meta`;
  }

  private getChunkKey(index: number): string {
    return `${CHUNK_PREFIX}${this.key}_${index}`;
  }
}