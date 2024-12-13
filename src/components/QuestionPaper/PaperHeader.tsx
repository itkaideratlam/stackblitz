import React from 'react';
import { Printer, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface PaperHeaderProps {
  title: string;
  onPrint: () => void;
  onExportWord: () => void;
  onBack?: () => void;
}

export function PaperHeader({ title, onPrint, onExportWord, onBack }: PaperHeaderProps) {
  return (
    <div className="p-6 border-b">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button
              variant="secondary"
              icon={ArrowLeft}
              onClick={onBack}
              className="mr-4"
            >
              Back
            </Button>
          )}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="space-x-4">
          <Button onClick={onPrint} icon={Printer}>
            Print
          </Button>
          <Button onClick={onExportWord} icon={FileText} variant="secondary">
            Export to Word
          </Button>
        </div>
      </div>
    </div>
  );
}