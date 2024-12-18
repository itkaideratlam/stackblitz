import React from 'react';
import type { QuestionPaper } from '../../types/question';

interface PrintableContentProps {
  paper: QuestionPaper;
  printRef: React.RefObject<HTMLDivElement>;
}

export function PrintableContent({ paper, printRef }: PrintableContentProps) {
  return (
    <div 
      ref={printRef}
      className="p-8 space-y-8 bg-white"
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold">{paper.title}</h1>
        <p className="text-gray-600">Class: {paper.class} | Subject: {paper.subject}</p>
        <p className="text-gray-600">Total Marks: {paper.totalMarks}</p>
      </div>

      <div className="space-y-6">
        {paper.questions.map((question, index) => (
          <div key={question.id} className="space-y-4">
            <div className="flex items-start">
              <span className="font-bold mr-2">{index + 1}.</span>
              <div className="flex-1">
                <p className="text-gray-900">{question.text}</p>
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
                <div className="mt-4 space-y-2">
                  {question.answers.map((answer, ansIndex) => (
                    <div key={answer.id} className="flex items-start ml-4">
                      <span className="mr-2">{String.fromCharCode(97 + ansIndex)})</span>
                      <div>
                        <p>{answer.text}</p>
                        {answer.imageUrl && (
                          <div className="mt-1">
                            <img
                              src={answer.imageUrl}
                              alt={`Answer ${ansIndex + 1}`}
                              style={{
                                width: answer.imagePosition?.width || 200,
                                height: answer.imagePosition?.height || 200,
                                transform: `translate(${answer.imagePosition?.x || 0}px, ${answer.imagePosition?.y || 0}px)`
                              }}
                              className="rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <span className="ml-4 text-gray-600">[{question.marks} marks]</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}