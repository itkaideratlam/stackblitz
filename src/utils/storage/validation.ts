import type { StorageData } from './types';
import { STORAGE_VERSION } from './constants';

export const validateStorageData = (data: any): data is StorageData => {
  if (!data || typeof data !== 'object') return false;
  if (!Array.isArray(data.questions)) return false;
  if (typeof data.version !== 'string') return false;

  return data.questions.every(question => 
    typeof question === 'object' &&
    typeof question.id === 'string' &&
    typeof question.text === 'string' &&
    typeof question.subject === 'string' &&
    typeof question.class === 'string' &&
    Array.isArray(question.answers)
  );
};

export const migrateStorageData = (data: any): StorageData => {
  // Handle data migrations between versions here
  const questions = Array.isArray(data.questions) ? data.questions : [];
  
  return {
    questions: questions.map(q => ({
      id: q.id || Date.now().toString(),
      text: q.text || '',
      subject: q.subject || '',
      class: q.class || '',
      imageUrl: q.imageUrl,
      imagePosition: q.imagePosition || { x: 0, y: 0, width: 200, height: 200 },
      answers: Array.isArray(q.answers) ? q.answers : []
    })),
    version: STORAGE_VERSION
  };
};