import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage/storage';
import { STORAGE_VERSION } from '../utils/storage/constants';
import type { Question } from '../types/question';

interface QuestionBankContextType {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id'>) => void;
  updateQuestion: (id: string, question: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
}

const QuestionBankContext = createContext<QuestionBankContextType | null>(null);

export function QuestionBankProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const data = loadFromStorage();
    return data?.questions || [];
  });

  useEffect(() => {
    saveToStorage({
      questions,
      version: STORAGE_VERSION
    });
  }, [questions]);

  const addQuestion = (questionData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const updateQuestion = (id: string, questionData: Partial<Question>) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...questionData } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <QuestionBankContext.Provider value={{
      questions,
      addQuestion,
      updateQuestion,
      deleteQuestion
    }}>
      {children}
    </QuestionBankContext.Provider>
  );
}

export function useQuestionBankContext() {
  const context = useContext(QuestionBankContext);
  if (!context) {
    throw new Error('useQuestionBankContext must be used within a QuestionBankProvider');
  }
  return context;
}