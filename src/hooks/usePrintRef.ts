import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export function usePrintRef() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
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

  return { printRef, handlePrint };
}