import { supabase } from '../lib/supabase';
import type { User } from '../types';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  studentId?: string;
  program?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  /**
   * Sign up a new user
   */
  async signUp(data: SignUpData) {
    const { email, password, name, studentId, program } = data;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'student',
          student_id: studentId,
          program,
        },
      },
    });

    if (authError) throw authError;

    // Try to upsert user profile if database is set up
    // This is optional - the trigger should handle it automatically
    if (authData.user) {
      try {
        await supabase
          .from('users')
          .upsert({
            id: authData.user.id,
            email,
            name,
            role: 'student',
            student_id: studentId,
            program,
          });
      } catch (profileError) {
        // Log but don't fail - trigger might handle this
        console.warn('Profile upsert skipped (OK if database not ready):', profileError);
      }
    }

    return authData;
  },

  /**
   * Sign in an existing user
   */
  async signIn(data: SignInData) {
    const { email, password } = data;
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return authData;
  },

  /**
   * Sign out the current user
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get the current session
   */
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  /**
   * Get current user profile
   */
  async getUserProfile(userId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as User;
  },

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Reset password
   */
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },
};
