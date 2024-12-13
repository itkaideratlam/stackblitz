import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import type { QuestionPaper as QuestionPaperType } from '../../types/question';
import { PaperHeader } from './PaperHeader';
import { PaperContent } from './PaperContent';
import { exportToWord } from '../../utils/export';

interface QuestionPaperProps {
  paper: QuestionPaperType;
}

export function QuestionPaper({ paper }: QuestionPaperProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportWord = () => {
    if (contentRef.current) {
      exportToWord(contentRef.current, paper.title);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <PaperHeader
        title={paper.title}
        onPrint={handlePrint}
        onExportWord={handleExportWord}
      />
      <PaperContent
        paper={paper}
        contentRef={contentRef}
      />
    </div>
  );
}