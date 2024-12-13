import React from 'react';
import { Image as ImageIcon, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  marks: number;
  onSelect: (question: Question) => void;
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
  onMarksChange: (questionId: string, value: string) => void;
}

export function QuestionCard({
  question,
  isSelected,
  marks,
  onSelect,
  onEdit,
  onDelete,
  onMarksChange
}: QuestionCardProps) {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md transition-shadow ${
        isSelected ? 'ring-2 ring-indigo-500' : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-medium text-gray-900">{question.text}</p>
          {question.imageUrl && (
            <div className="mt-2">
              <img
                src={question.imageUrl}
                alt="Question"
                style={{
                  width: question.imagePosition?.width || 200,
                  height: question.imagePosition?.height || 200,
                  transform: `translate(${question.imagePosition?.x || 0}px, ${question.imagePosition?.y || 0}px)`
                }}
                className="rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{question.subject}</span>
          <span>Class {question.class}</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={marks || ''}
            onChange={(e) => onMarksChange(question.id, e.target.value)}
            placeholder="Marks"
            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
          />
          <Button
            variant={isSelected ? 'secondary' : 'primary'}
            onClick={() => onSelect(question)}
          >
            {isSelected ? 'Deselect' : 'Select'}
          </Button>
          <Button
            variant="secondary"
            icon={Edit}
            onClick={() => onEdit(question)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            icon={Trash2}
            onClick={() => onDelete(question.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}