import { useState, useCallback, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage/storage';
import { STORAGE_VERSION } from '../utils/storage/constants';
import { useDebounce } from './useDebounce';
import type { Question } from '../types/question';

const SAVE_DELAY = 1000; // 1 second debounce

export function useQuestionBank() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const data = loadFromStorage();
    return data?.questions || [];
  });

  const debouncedQuestions = useDebounce(questions, SAVE_DELAY);

  useEffect(() => {
    if (debouncedQuestions.length > 0 || questions.length === 0) {
      saveToStorage({
        questions: debouncedQuestions,
        version: STORAGE_VERSION
      });
    }
  }, [debouncedQuestions]);

  const addQuestion = useCallback((questionData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
    };
    setQuestions(prev => [...prev, newQuestion]);
  }, []);

  const updateQuestion = useCallback((id: string, questionData: Partial<Question>) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...questionData } : q))
    );
  }, []);

  const deleteQuestion = useCallback((id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  }, []);

  return {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  };
}