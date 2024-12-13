import { useRef, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { exportToWord } from '../utils/export';

export function usePaperExport() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        img {
          max-width: 100%;
          page-break-inside: avoid;
        }
      }
    `,
  });

  const handleExportWord = useCallback(() => {
    if (contentRef.current) {
      exportToWord(contentRef.current, 'question-paper');
    }
  }, []);

  return {
    contentRef,
    handlePrint,
    handleExportWord,
  };
}