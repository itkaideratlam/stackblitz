import type { QuestionPaper as QuestionPaperType } from '../../types/question';

export interface QuestionPaperProps {
  paper: QuestionPaperType;
  onBack?: () => void;
}