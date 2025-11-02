import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';
import type { User, Course, Assignment } from '../types';

interface DashboardPageProps {
  user: User;
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Introduction to Biotechnology',
        description: 'Fundamentals of modern biotechnology',
        instructor: { id: '1', name: 'Dr. Sarah Ahmed' },
        department: 'Biotechnology',
        level: 'beginner',
        duration_weeks: 8,
        thumbnail_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
        rating: 4.8,
        enrolled_count: 1245,
        progress: 65,
      },
      {
        id: '2',
        title: 'Genomics and Bioinformatics',
        description: 'Advanced genomic analysis techniques',
        instructor: { id: '2', name: 'Dr. Mohamed Hassan' },
        department: 'Genomics',
        level: 'intermediate',
        duration_weeks: 12,
        thumbnail_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400',
        rating: 4.9,
        enrolled_count: 892,
        progress: 42,
      },
      {
        id: '3',
        title: 'AI-Powered Diagnostics',
        description: 'Machine learning in medical diagnostics',
        instructor: { id: '3', name: 'Dr. Layla Ibrahim' },
        department: 'AI in Healthcare',
        level: 'advanced',
        duration_weeks: 10,
        thumbnail_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
        rating: 4.7,
        enrolled_count: 654,
        progress: 28,
      },
      {
        id: '4',
        title: 'Molecular Biology Essentials',
        description: 'Core concepts in molecular biology',
        instructor: { id: '4', name: 'Dr. Ahmed Khalil' },
        department: 'Medical Sciences',
        level: 'beginner',
        duration_weeks: 6,
        thumbnail_url: 'https://images.unsplash.com/photo-1578496479531-32e296d6c977?w=400',
        rating: 4.6,
        enrolled_count: 1567,
        progress: 85,
      },
    ];

    const mockAssignments: Assignment[] = [
      {
        id: '1',
        course_id: '1',
        title: 'DNA Sequencing Lab Report',
        description: 'Complete analysis of DNA sequencing results',
        due_date: new Date('2025-11-08'),
        status: 'pending',
      },
      {
        id: '2',
        course_id: '2',
        title: 'Genomic Data Analysis Quiz',
        description: 'Assessment on genomic analysis techniques',
        due_date: new Date('2025-11-10'),
        status: 'pending',
      },
      {
        id: '3',
        course_id: '3',
        title: 'ML Model Implementation',
        description: 'Build a diagnostic prediction model',
        due_date: new Date('2025-11-15'),
        status: 'pending',
      },
    ];

    setCourses(mockCourses);
    setAssignments(mockAssignments);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  const stats = [
    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Study Hours', value: '42h', icon: Clock, color: 'bg-green-500' },
    { label: 'Avg Progress', value: '55%', icon: Target, color: 'bg-purple-500' },
    { label: 'Achievements', value: '12', icon: Award, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-primary-100 text-lg">
          Continue your learning journey in {user.program}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Current Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Current Courses</h2>
            <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600">by {course.instructor.name}</p>
                      </div>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full capitalize">
                        {course.level}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progress</span>
                        <span className="text-sm font-semibold text-primary-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button className="mt-4 btn-primary text-sm">
                      Continue Learning
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Study Streak */}
          <div className="card bg-gradient-to-br from-orange-50 to-red-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Study Streak</h3>
              <Flame className="text-orange-500" size={24} />
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-orange-500 mb-2">12</p>
              <p className="text-gray-600">days in a row!</p>
              <p className="text-sm text-gray-500 mt-2">Keep it up! 🔥</p>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Upcoming Deadlines</h3>
              <Calendar className="text-gray-400" size={20} />
            </div>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{assignment.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Due: {assignment.due_date.toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Partner Quick Access */}
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50">
            <h3 className="font-bold text-gray-900 mb-3">Your AI Partner</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get personalized help from Mistral, your biosciences AI mentor
            </p>
            <Link to="/ai-partner" className="btn-primary w-full text-center block">
              Start Chat
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Completed Lesson</p>
                  <p className="text-xs text-gray-500">DNA Replication - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="text-blue-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Earned Badge</p>
                  <p className="text-xs text-gray-500">Lab Master - Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
