import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';
import { DraggableImage } from '../DraggableImage';
import { Button } from '../ui/Button';
import type { Answer } from '../../types/question';
import type { ImagePosition } from '../../types/image';

interface AnswerListProps {
  answers: Answer[];
  onChange: (answers: Answer[]) => void;
}

export function AnswerList({ answers, onChange }: AnswerListProps) {
  const handleAddAnswer = () => {
    onChange([...answers, { id: Date.now().toString(), text: '', imageUrl: '' }]);
  };

  const handleRemoveAnswer = (id: string) => {
    onChange(answers.filter(answer => answer.id !== id));
  };

  const handleAnswerChange = (id: string, field: keyof Answer, value: any) => {
    onChange(answers.map(answer =>
      answer.id === id ? { ...answer, [field]: value } : answer
    ));
  };

  const handleImagePositionChange = (id: string, position: ImagePosition) => {
    onChange(answers.map(answer =>
      answer.id === id ? { ...answer, imagePosition: position } : answer
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Answers</h3>
        <Button
          type="button"
          onClick={handleAddAnswer}
          icon={PlusCircle}
        >
          Add Answer
        </Button>
      </div>

      {answers.map((answer, index) => (
        <div key={answer.id} className="space-y-2 p-4 border rounded-md">
          <div className="flex items-center justify-between">
            <span className="font-medium">Answer {index + 1}</span>
            {answers.length > 1 && (
              <Button
                type="button"
                variant="danger"
                icon={MinusCircle}
                onClick={() => handleRemoveAnswer(answer.id)}
              >
                Remove
              </Button>
            )}
          </div>

          <input
            type="text"
            value={answer.text}
            onChange={(e) => handleAnswerChange(answer.id, 'text', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Answer text"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Answer Image</label>
            <ImageUploader
              onImageUpload={(dataUrl) => handleAnswerChange(answer.id, 'imageUrl', dataUrl)}
            />
            {answer.imageUrl && (
              <DraggableImage
                src={answer.imageUrl}
                alt={`Answer ${index + 1}`}
                initialPosition={answer.imagePosition || { x: 0, y: 0, width: 200, height: 200 }}
                onPositionChange={(position) => handleImagePositionChange(answer.id, position)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}