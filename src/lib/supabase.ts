import { createClient } from '@supabase/supabase-js';

// These should be replaced with actual Supabase project credentials
// For now, using placeholder values - will be configured in environment variables
const supabaseUrl ="https://uvwahahpvmzuawwshoui.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2d2FoYWhwdm16dWF3d3Nob3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMzUwNzAsImV4cCI6MjA3ODkxMTA3MH0.9omYRmzog9gzNN-s7SaKgB6OuPwfq9yJDDVB1q3DHZE";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'student' | 'instructor' | 'admin';
          student_id?: string;
          program?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          instructor_id: string;
          department: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          duration_weeks: number;
          thumbnail_url?: string;
          rating: number;
          enrolled_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          progress: number;
          enrolled_at: string;
        };
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id' | 'enrolled_at'>;
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
    };
  };
};
