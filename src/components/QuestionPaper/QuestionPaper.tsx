import React from 'react';
import { usePaperExport } from '../../hooks/usePaperExport';
import { PaperHeader } from './PaperHeader';
import { PaperContent } from './PaperContent';
import type { QuestionPaperProps } from './QuestionPaper.types';

export function QuestionPaper({ paper, onBack }: QuestionPaperProps) {
  const { contentRef, handlePrint, handleExportWord } = usePaperExport();

  return (
    <div className="bg-white shadow-lg rounded-lg">
      <PaperHeader
        title={paper.title}
        onPrint={handlePrint}
        onExportWord={handleExportWord}
        onBack={onBack}
      />
      <PaperContent
        paper={paper}
        contentRef={contentRef}
      />
    </div>
  );
}