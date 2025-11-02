export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  student_id?: string;
  program?: string;
  avatar_url?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar_url?: string;
  };
  department: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  thumbnail_url?: string;
  rating: number;
  enrolled_count: number;
  progress?: number;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'quiz' | 'lab';
  duration_minutes: number;
  order: number;
  is_locked: boolean;
  is_completed: boolean;
}

export interface AIPartner {
  id: string;
  name: string;
  specialty: string;
  description: string;
  avatar_url?: string;
  is_online: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  partner_id?: string;
}

export interface VirtualLab {
  id: string;
  title: string;
  course_id: string;
  description: string;
  objectives: string[];
  duration_minutes: number;
}

export interface Assignment {
  id: string;
  course_id: string;
  title: string;
  description: string;
  due_date: Date;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
}
