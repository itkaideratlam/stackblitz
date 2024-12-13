import React from 'react';
import { QuestionList } from './QuestionList';
import type { QuestionPaper } from '../../types/question';

interface PaperContentProps {
  paper: QuestionPaper;
  contentRef: React.RefObject<HTMLDivElement>;
}

export function PaperContent({ paper, contentRef }: PaperContentProps) {
  return (
    <div 
      ref={contentRef}
      id="question-paper-content" 
      className="p-8 space-y-8 bg-white"
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        boxSizing: 'border-box',
        '@media print': {
          margin: 0,
          padding: '20mm',
          width: '210mm',
          minHeight: '297mm',
          pageBreakAfter: 'always'
        }
      }}
    >
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold">{paper.title}</h1>
        <p className="text-gray-600">Class: {paper.class} | Subject: {paper.subject}</p>
        <p className="text-gray-600">Total Marks: {paper.totalMarks}</p>
      </div>
      <QuestionList questions={paper.questions} />
    </div>
  );
}