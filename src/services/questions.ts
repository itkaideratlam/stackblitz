import { supabase } from '../config/supabase';
import type { Question, Answer } from '../types';

export const questionService = {
  async create(question: Omit<Question, 'id'>) {
    const { data, error } = await supabase
      .from('questions')
      .insert({
        text: question.text,
        subject: question.subject,
        class: question.class,
        image_url: question.imageUrl,
        image_position: question.imagePosition
      })
      .select()
      .single();

    if (error) throw error;

    // Insert answers
    if (question.answers.length > 0) {
      const { error: answersError } = await supabase
        .from('answers')
        .insert(
          question.answers.map(answer => ({
            question_id: data.id,
            text: answer.text,
            image_url: answer.imageUrl,
            image_position: answer.imagePosition
          }))
        );

      if (answersError) throw answersError;
    }

    return data;
  },

  async getAll() {
    const { data: questions, error } = await supabase
      .from('questions')
      .select(`
        *,
        answers (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return questions;
  },

  async update(id: string, question: Partial<Question>) {
    const { error } = await supabase
      .from('questions')
      .update({
        text: question.text,
        subject: question.subject,
        class: question.class,
        image_url: question.imageUrl,
        image_position: question.imagePosition
      })
      .eq('id', id);

    if (error) throw error;

    if (question.answers) {
      // Delete existing answers
      await supabase
        .from('answers')
        .delete()
        .eq('question_id', id);

      // Insert new answers
      const { error: answersError } = await supabase
        .from('answers')
        .insert(
          question.answers.map(answer => ({
            question_id: id,
            text: answer.text,
            image_url: answer.imageUrl,
            image_position: answer.imagePosition
          }))
        );

      if (answersError) throw answersError;
    }
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};