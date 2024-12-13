import { useState, useCallback } from 'react';
import type { Question } from '../types/question';

export function useSelectedQuestions() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleQuestion = useCallback((question: Question) => {
    setSelectedQuestions(prev => {
      const isSelected = selectedIds.has(question.id);
      if (isSelected) {
        return prev.filter(q => q.id !== question.id);
      } else {
        return [...prev, question];
      }
    });

    setSelectedIds(prev => {
      const newIds = new Set(prev);
      if (prev.has(question.id)) {
        newIds.delete(question.id);
      } else {
        newIds.add(question.id);
      }
      return newIds;
    });
  }, [selectedIds]);

  const clearSelection = useCallback(() => {
    setSelectedQuestions([]);
    setSelectedIds(new Set());
  }, []);

  return {
    selectedQuestions,
    selectedIds,
    toggleQuestion,
    clearSelection,
  };
}