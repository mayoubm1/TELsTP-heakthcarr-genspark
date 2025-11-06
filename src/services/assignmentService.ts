import { supabase } from '../lib/supabase';
import type { Assignment } from '../types';

export const assignmentService = {
  /**
   * Get assignments for a course
   */
  async getCourseAssignments(courseId: string): Promise<Assignment[]> {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('course_id', courseId)
      .order('due_date', { ascending: true });

    if (error) throw error;

    return data.map(assignment => ({
      ...assignment,
      due_date: new Date(assignment.due_date),
      status: 'pending',
    })) as Assignment[];
  },

  /**
   * Get user assignments with submission status
   */
  async getUserAssignments(userId: string, courseId?: string) {
    let query = supabase
      .from('assignments')
      .select(`
        *,
        submission:submissions!left (
          id,
          status,
          score,
          submitted_at
        )
      `);

    if (courseId) {
      query = query.eq('course_id', courseId);
    }

    // Filter by courses user is enrolled in
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', userId);

    if (enrollments && enrollments.length > 0) {
      const courseIds = enrollments.map(e => e.course_id);
      query = query.in('course_id', courseIds);
    }

    query = query.order('due_date', { ascending: true });

    const { data, error } = await query;

    if (error) throw error;

    return data.map(assignment => {
      const submission = Array.isArray(assignment.submission) 
        ? assignment.submission[0] 
        : assignment.submission;

      return {
        ...assignment,
        due_date: new Date(assignment.due_date),
        status: submission?.status || 'pending',
        score: submission?.score,
      };
    }) as Assignment[];
  },

  /**
   * Submit an assignment
   */
  async submitAssignment(
    userId: string,
    assignmentId: string,
    content: string,
    fileUrl?: string
  ) {
    const { data, error } = await supabase
      .from('submissions')
      .upsert({
        assignment_id: assignmentId,
        user_id: userId,
        content,
        file_url: fileUrl,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get submission for an assignment
   */
  async getSubmission(userId: string, assignmentId: string) {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', userId)
      .eq('assignment_id', assignmentId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  /**
   * Get upcoming deadlines
   */
  async getUpcomingDeadlines(userId: string, limit = 5) {
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', userId);

    if (!enrollments || enrollments.length === 0) return [];

    const courseIds = enrollments.map(e => e.course_id);

    const { data, error } = await supabase
      .from('assignments')
      .select(`
        *,
        course:courses (
          title
        ),
        submission:submissions!left (
          status
        )
      `)
      .in('course_id', courseIds)
      .gte('due_date', new Date().toISOString())
      .order('due_date', { ascending: true })
      .limit(limit);

    if (error) throw error;

    return data.map(assignment => {
      const submission = Array.isArray(assignment.submission)
        ? assignment.submission.find((s: any) => s.user_id === userId)
        : assignment.submission;

      return {
        ...assignment,
        due_date: new Date(assignment.due_date),
        status: submission?.status || 'pending',
      };
    });
  },
};
