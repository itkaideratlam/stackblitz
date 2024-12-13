import React from 'react';
import { AnswerItem } from './AnswerItem';
import type { Answer } from '../../types/question';

interface AnswerListProps {
  answers: Answer[];
}

export function AnswerList({ answers }: AnswerListProps) {
  return (
    <div className="mt-4 space-y-2">
      {answers.map((answer, index) => (
        <AnswerItem 
          key={answer.id} 
          answer={answer} 
          index={index} 
        />
      ))}
    </div>
  );
}