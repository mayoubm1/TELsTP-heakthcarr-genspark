import { supabase } from '../lib/supabase';

export const progressService = {
  /**
   * Mark a lesson as completed
   */
  async completeLess(userId: string, lessonId: string) {
    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get user's lesson progress for a course
   */
  async getUserLessonProgress(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select(`
        *,
        lesson:lessons (
          id,
          title,
          module_id,
          module:modules!inner (
            course_id
          )
        )
      `)
      .eq('user_id', userId)
      .eq('lesson.module.course_id', courseId);

    if (error) throw error;
    return data;
  },

  /**
   * Get enrollment progress
   */
  async getEnrollmentProgress(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select('progress, enrolled_at, completed_at')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get user study statistics
   */
  async getUserStats(userId: string) {
    // Get total enrolled courses
    const { count: enrolledCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get completed courses
    const { count: completedCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('progress', 100);

    // Get total lessons completed
    const { count: lessonsCompleted } = await supabase
      .from('lesson_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_completed', true);

    // Get average progress across all enrollments
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('progress')
      .eq('user_id', userId);

    const avgProgress = enrollments && enrollments.length > 0
      ? enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length
      : 0;

    return {
      enrolled_courses: enrolledCount || 0,
      completed_courses: completedCount || 0,
      lessons_completed: lessonsCompleted || 0,
      average_progress: Math.round(avgProgress),
    };
  },

  /**
   * Get recent activity for user
   */
  async getRecentActivity(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select(`
        *,
        lesson:lessons (
          id,
          title,
          type,
          module:modules (
            title,
            course:courses (
              title
            )
          )
        )
      `)
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },
};
