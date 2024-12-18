export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          id: string
          created_at: string
          text: string
          subject: string
          class: string
          image_url: string | null
          image_position: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          text: string
          subject: string
          class: string
          image_url?: string | null
          image_position?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          text?: string
          subject?: string
          class?: string
          image_url?: string | null
          image_position?: Json | null
        }
      }
      answers: {
        Row: {
          id: string
          created_at: string
          question_id: string
          text: string
          image_url: string | null
          image_position: Json | null
          is_correct: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          question_id: string
          text: string
          image_url?: string | null
          image_position?: Json | null
          is_correct?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          question_id?: string
          text?: string
          image_url?: string | null
          image_position?: Json | null
          is_correct?: boolean
        }
      }
      question_papers: {
        Row: {
          id: string
          created_at: string
          title: string
          class: string
          subject: string
          total_marks: number
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          class: string
          subject: string
          total_marks: number
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          class?: string
          subject?: string
          total_marks?: number
        }
      }
      paper_questions: {
        Row: {
          id: string
          created_at: string
          paper_id: string
          question_id: string
          marks: number
          order: number
        }
        Insert: {
          id?: string
          created_at?: string
          paper_id: string
          question_id: string
          marks: number
          order: number
        }
        Update: {
          id?: string
          created_at?: string
          paper_id?: string
          question_id?: string
          marks?: number
          order?: number
        }
      }
    }
  }
}