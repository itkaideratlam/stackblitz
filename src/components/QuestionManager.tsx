import React, { useState } from 'react';
import { QuestionForm } from './QuestionForm/QuestionForm';
import { QuestionBank } from './QuestionBank';
import { QuestionPaper } from './QuestionPaper/QuestionPaper';
import { useQuestionBankContext } from '../context/QuestionBankContext';
import { useSelectedQuestions } from '../hooks/useSelectedQuestions';
import { PlusCircle, Library, FileText } from 'lucide-react';
import type { Question } from '../types/question';

type Tab = 'add' | 'bank' | 'paper';

export function QuestionManager() {
  const [activeTab, setActiveTab] = useState<Tab>('add');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const { addQuestion, updateQuestion, deleteQuestion, questions } = useQuestionBankContext();
  const { selectedQuestions, selectedIds, toggleQuestion, clearSelection } = useSelectedQuestions();

  const handleQuestionSubmit = (questionData: Omit<Question, 'id'>) => {
    if (editingQuestion) {
      updateQuestion(editingQuestion.id, questionData);
      setEditingQuestion(null);
    } else {
      addQuestion(questionData);
    }
    setActiveTab('bank');
  };

  const handleCreatePaper = () => {
    if (selectedQuestions.length > 0) {
      setActiveTab('paper');
    }
  };

  return (
    <div className="space-y-6">
      <nav className="flex space-x-4">
        <button
          onClick={() => setActiveTab('add')}
          className={`${
            activeTab === 'add'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {editingQuestion ? 'Edit' : 'Add'} Question
        </button>
        <button
          onClick={() => setActiveTab('bank')}
          className={`${
            activeTab === 'bank'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
        >
          <Library className="h-4 w-4 mr-2" /> Question Bank
          {questions.length > 0 && (
            <span className="ml-2 bg-indigo-500 text-white px-2 py-0.5 rounded-full text-xs">
              {questions.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('paper')}
          className={`${
            activeTab === 'paper'
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700'
          } px-3 py-2 rounded-md text-sm font-medium flex items-center`}
        >
          <FileText className="h-4 w-4 mr-2" /> Question Paper
          {selectedQuestions.length > 0 && (
            <span className="ml-2 bg-indigo-500 text-white px-2 py-0.5 rounded-full text-xs">
              {selectedQuestions.length}
            </span>
          )}
        </button>
      </nav>

      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === 'add' && (
          <QuestionForm
            onSubmit={handleQuestionSubmit}
            initialQuestion={editingQuestion}
          />
        )}

        {activeTab === 'bank' && (
          <QuestionBank
            questions={questions}
            onSelectQuestion={toggleQuestion}
            onEditQuestion={(q) => {
              setEditingQuestion(q);
              setActiveTab('add');
            }}
            onDeleteQuestion={deleteQuestion}
            selectedQuestionIds={selectedIds}
            onCreatePaper={handleCreatePaper}
          />
        )}

        {activeTab === 'paper' && selectedQuestions.length > 0 && (
          <QuestionPaper
            paper={{
              id: Date.now().toString(),
              title: 'Question Paper',
              class: selectedQuestions[0].class,
              subject: selectedQuestions[0].subject,
              totalMarks: selectedQuestions.reduce((sum, q) => sum + (q.marks || 0), 0),
              questions: selectedQuestions
            }}
            onBack={() => {
              setActiveTab('bank');
              clearSelection();
            }}
          />
        )}
      </div>
    </div>
  );
}