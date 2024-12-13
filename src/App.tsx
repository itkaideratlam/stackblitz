import React from 'react';
import { QuestionBankProvider } from './context/QuestionBankContext';
import { QuestionManager } from './components/QuestionManager';

export default function App() {
  return (
    <QuestionBankProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <QuestionManager />
        </div>
      </div>
    </QuestionBankProvider>
  );
}