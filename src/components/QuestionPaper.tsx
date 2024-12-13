import React from 'react';
import { useReactToPrint } from 'react-to-print';
import type { QuestionPaper as QuestionPaperType } from '../types/question';
import { FileDown, Printer, FileText } from 'lucide-react';
import { Button } from './ui/Button';

interface QuestionPaperProps {
  paper: QuestionPaperType;
}

export function QuestionPaper({ paper }: QuestionPaperProps) {
  const componentRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const exportToWord = () => {
    const content = document.getElementById('question-paper-content');
    if (content) {
      const html = content.innerHTML;
      const blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${paper.title}.doc`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{paper.title}</h2>
          <div className="space-x-4">
            <Button onClick={handlePrint} icon={Printer}>
              Print
            </Button>
            <Button onClick={exportToWord} icon={FileText} variant="secondary">
              Export to Word
            </Button>
          </div>
        </div>
      </div>

      <div 
        ref={componentRef}
        id="question-paper-content" 
        className="p-8 space-y-8"
        style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}
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
                  {question.image && (
                    <div className="mt-2">
                      <img
                        src={question.image.url}
                        alt="Question"
                        style={{
                          width: question.image.position.width,
                          height: question.image.position.height,
                          transform: `translate(${question.image.position.x}px, ${question.image.position.y}px)`
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
                          {answer.image && (
                            <div className="mt-1">
                              <img
                                src={answer.image.url}
                                alt={`Answer ${ansIndex + 1}`}
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
                    ))}
                  </div>
                </div>
                <span className="ml-4 text-gray-600">[{question.marks} marks]</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}