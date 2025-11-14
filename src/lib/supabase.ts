import { createClient } from '@supabase/supabase-js';

// These should be replaced with actual Supabase project credentials
// For now, using placeholder values - will be configured in environment variables
const supabaseUrl = "https://vrfyjirddfdnwuffzqhb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnlqaXJkZGZkbnd1ZmZ6cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MDYwNjMsImV4cCI6MjA3NTQ4MjA2M30.glgJwI2yIqUFG8ZtWJk2esxGdXw6nFp5eQ8aANbRAvE"
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
