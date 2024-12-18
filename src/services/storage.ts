import { supabase } from '../config/supabase';

export const storageService = {
  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('question-images')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('question-images')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async deleteImage(url: string) {
    const path = url.split('/').pop();
    if (!path) return;

    const { error } = await supabase.storage
      .from('question-images')
      .remove([path]);

    if (error) throw error;
  }
};