import React from 'react';
import { QuestionItem } from './QuestionItem';
import type { Question } from '../../types/question';

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <QuestionItem 
          key={question.id} 
          question={question} 
          index={index} 
        />
      ))}
    </div>
  );
}