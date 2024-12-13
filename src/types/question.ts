import { ImagePosition } from './image';

export interface Answer {
  id: string;
  text: string;
  imageUrl?: string;
  imagePosition?: ImagePosition;
}

export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  imagePosition?: ImagePosition;
  subject: string;
  class: string;
  answers: Answer[];
  marks?: number;
}

export interface QuestionPaper {
  id: string;
  title: string;
  class: string;
  subject: string;
  totalMarks: number;
  questions: Question[];
}