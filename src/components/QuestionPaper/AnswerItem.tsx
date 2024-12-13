import React from 'react';
import type { Answer } from '../../types/question';

interface AnswerItemProps {
  answer: Answer;
  index: number;
}

export function AnswerItem({ answer, index }: AnswerItemProps) {
  return (
    <div className="flex items-start ml-4">
      <span className="mr-2">{String.fromCharCode(97 + index)})</span>
      <div>
        <p>{answer.text}</p>
        {answer.image && (
          <div className="mt-1">
            <img
              src={answer.image.url}
              alt={`Answer ${index + 1}`}
              style={{
                width: answer.image.position.width,
                height: answer.image.position.height,
                transform: `translate(${answer.image.position.x}px, ${answer.image.position.y}px)`
              }}
              className="rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}