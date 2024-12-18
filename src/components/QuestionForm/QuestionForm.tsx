import React, { useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { ImagePreview } from './ImagePreview';
import { AnswerList } from './AnswerList';
import { Button } from '../ui/Button';
import type { Question } from '../../types/question';
import type { ImagePosition } from '../../types/image';

interface QuestionFormProps {
  onSubmit: (question: Omit<Question, 'id'>) => void;
  initialQuestion?: Question | null;
}

export function QuestionForm({ onSubmit, initialQuestion }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    text: initialQuestion?.text || '',
    subject: initialQuestion?.subject || '',
    class: initialQuestion?.class || '',
    imageUrl: initialQuestion?.imageUrl || '',
    imagePosition: initialQuestion?.imagePosition || { x: 0, y: 0, width: 200, height: 200 },
    answers: initialQuestion?.answers || [{ id: '1', text: '', imageUrl: '' }]
  });

  const handleImagePositionChange = (position: ImagePosition) => {
    setFormData(prev => ({
      ...prev,
      imagePosition: position
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question Text</label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Question Image</label>
          <ImageUploader 
            onImageUpload={(dataUrl) => setFormData(prev => ({ ...prev, imageUrl: dataUrl }))}
          />
          {formData.imageUrl && (
            <ImagePreview
              imageUrl={formData.imageUrl}
              position={formData.imagePosition}
              onPositionChange={handleImagePositionChange}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <input
              type="text"
              value={formData.class}
              onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <AnswerList
          answers={formData.answers}
          onChange={(answers) => setFormData(prev => ({ ...prev, answers }))}
        />
      </div>

      <Button type="submit" className="w-full">
        {initialQuestion ? 'Update' : 'Save'} Question
      </Button>
    </form>
  );
}