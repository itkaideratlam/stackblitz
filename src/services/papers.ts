import { supabase } from '../config/supabase';
import type { QuestionPaper } from '../types';

export const paperService = {
  async create(paper: Omit<QuestionPaper, 'id'>) {
    const { data, error } = await supabase
      .from('question_papers')
      .insert({
        title: paper.title,
        class: paper.class,
        subject: paper.subject,
        total_marks: paper.totalMarks
      })
      .select()
      .single();

    if (error) throw error;

    if (paper.questions.length > 0) {
      const { error: questionsError } = await supabase
        .from('paper_questions')
        .insert(
          paper.questions.map((question, index) => ({
            paper_id: data.id,
            question_id: question.id,
            marks: question.marks || 0,
            order_num: index + 1
          }))
        );

      if (questionsError) throw questionsError;
    }

    return data;
  },

  async getAll() {
    const { data: papers, error } = await supabase
      .from('question_papers')
      .select(`
        *,
        paper_questions (
          *,
          question:questions (
            *,
            answers (*)
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return papers;
  },

  async getById(id: string) {
    const { data: paper, error } = await supabase
      .from('question_papers')
      .select(`
        *,
        paper_questions (
          *,
          question:questions (
            *,
            answers (*)
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return paper;
  }
};