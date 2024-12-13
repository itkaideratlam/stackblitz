import React, { useState } from 'react';
import type { Question } from '../types';
import { Image as ImageIcon, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { QuestionFilter } from './QuestionFilter';
import { QuestionCard } from './QuestionCard';

interface QuestionBankProps {
  questions: Question[];
  onSelectQuestion: (question: Question) => void;
  onDeselectQuestion: (questionId: string) => void;
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
  selectedQuestionIds: Set<string>;
}

export function QuestionBank({
  questions = [], // Provide default empty array
  onSelectQuestion,
  onDeselectQuestion,
  onEditQuestion,
  onDeleteQuestion,
  selectedQuestionIds
}: QuestionBankProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [marks, setMarks] = useState<Record<string, number>>({});

  const subjects = Array.from(new Set(questions.map(q => q.subject)));
  const classes = Array.from(new Set(questions.map(q => q.class)));

  const filteredQuestions = questions.filter(q => 
    (!selectedSubject || q.subject === selectedSubject) &&
    (!selectedClass || q.class === selectedClass)
  );

  const handleQuestionSelect = (question: Question) => {
    if (selectedQuestionIds.has(question.id)) {
      onDeselectQuestion(question.id);
    } else {
      const questionWithMarks = {
        ...question,
        marks: marks[question.id] || 0
      };
      onSelectQuestion(questionWithMarks);
    }
  };

  const handleMarksChange = (questionId: string, value: string) => {
    const newMarks = { ...marks, [questionId]: parseInt(value) || 0 };
    setMarks(newMarks);
  };

  return (
    <div className="space-y-6">
      <QuestionFilter
        subjects={subjects}
        classes={classes}
        selectedSubject={selectedSubject}
        selectedClass={selectedClass}
        onSubjectChange={setSelectedSubject}
        onClassChange={setSelectedClass}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            isSelected={selectedQuestionIds.has(question.id)}
            marks={marks[question.id] || 0}
            onSelect={handleQuestionSelect}
            onEdit={onEditQuestion}
            onDelete={onDeleteQuestion}
            onMarksChange={handleMarksChange}
          />
        ))}
      </div>
    </div>
  );
}