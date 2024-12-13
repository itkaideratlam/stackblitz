import React from 'react';
import { QuestionImage } from './QuestionImage';
import { AnswerList } from './AnswerList';
import type { Question } from '../../types/question';

interface QuestionItemProps {
  question: Question;
  index: number;
}

export function QuestionItem({ question, index }: QuestionItemProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <span className="font-bold mr-2">{index + 1}.</span>
        <div className="flex-1">
          <p className="text-gray-900">{question.text}</p>
          {question.image && <QuestionImage image={question.image} />}
          <AnswerList answers={question.answers} />
        </div>
        <span className="ml-4 text-gray-600">[{question.marks} marks]</span>
      </div>
    </div>
  );
}