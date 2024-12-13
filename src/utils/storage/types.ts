import type { Question } from '../../types/question';

export interface StorageMetadata {
  chunks: number;
  timestamp: number;
  version: string;
}

export interface StorageData {
  questions: Question[];
  version: string;
}