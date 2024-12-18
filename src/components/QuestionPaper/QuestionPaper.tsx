import React from 'react';
import { usePrintRef } from '../../hooks/usePrintRef';
import { PrintableContent } from './PrintableContent';
import { PaperHeader } from './PaperHeader';
import { exportToWord } from '../../utils/export';
import type { QuestionPaperProps } from './QuestionPaper.types';

export function QuestionPaper({ paper, onBack }: QuestionPaperProps) {
  const { printRef, handlePrint } = usePrintRef();

  const handleExportWord = () => {
    if (printRef.current) {
      exportToWord(printRef.current, paper.title);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <PaperHeader
        title={paper.title}
        onPrint={handlePrint}
        onExportWord={handleExportWord}
        onBack={onBack}
      />
      <PrintableContent
        paper={paper}
        printRef={printRef}
      />
    </div>
  );
}