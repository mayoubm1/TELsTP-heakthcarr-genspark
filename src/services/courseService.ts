import { supabase } from '../lib/supabase';
import type { Course } from '../types';

export interface CourseFilters {
  department?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  search?: string;
}

export const courseService = {
  /**
   * Get all courses with optional filters
   */
  async getCourses(filters?: CourseFilters): Promise<Course[]> {
    let query = supabase
      .from('courses')
      .select(`
        *,
        instructor:instructor_id (
          id,
          name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (filters?.department) {
      query = query.eq('department', filters.department);
    }

    if (filters?.level) {
      query = query.eq('level', filters.level);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(course => ({
      ...course,
      instructor: course.instructor || { id: '', name: 'Unknown' },
    })) as Course[];
  },

  /**
   * Get a single course by ID with full details
   */
  async getCourseById(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:instructor_id (
          id,
          name,
          avatar_url
        ),
        modules (
          id,
          title,
          description,
          order_index,
          lessons (
            id,
            title,
            description,
            type,
            duration_minutes,
            order_index
          )
        )
      `)
      .eq('id', courseId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get enrolled courses for a user
   */
  async getUserEnrolledCourses(userId: string): Promise<Course[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        progress,
        enrolled_at,
        course:courses (
          *,
          instructor:instructor_id (
            id,
            name,
            avatar_url
          )
        )
      `)
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;

    return data.map(enrollment => ({
      ...enrollment.course,
      progress: enrollment.progress,
      instructor: enrollment.course.instructor || { id: '', name: 'Unknown' },
    })) as Course[];
  },

  /**
   * Enroll user in a course
   */
  async enrollInCourse(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Check if user is enrolled in a course
   */
  async isEnrolled(userId: string, courseId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  /**
   * Get course statistics
   */
  async getCourseStats(courseId: string) {
    const { data: course, error } = await supabase
      .from('courses')
      .select('enrolled_count, rating')
      .eq('id', courseId)
      .single();

    if (error) throw error;

    // Get completion rate
    const { count: totalEnrollments } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('course_id', courseId);

    const { count: completedEnrollments } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('course_id', courseId)
      .eq('progress', 100);

    const completionRate = totalEnrollments && totalEnrollments > 0
      ? (completedEnrollments || 0) / totalEnrollments * 100
      : 0;

    return {
      ...course,
      completion_rate: completionRate,
    };
  },

  /**
   * Get course modules and lessons
   */
  async getCourseModules(courseId: string) {
    const { data, error } = await supabase
      .from('modules')
      .select(`
        *,
        lessons (
          *
        )
      `)
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  },
};
