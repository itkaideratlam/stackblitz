import type { Question } from '../../types/question';

export interface QuestionBankProps {
  onSelectQuestion: (question: Question) => void;
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
  selectedQuestionIds: Set<string>;
  onCreatePaper: () => void;
}