import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import type { Course } from '../types';

export default function CourseCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Introduction to Biotechnology',
        description: 'Fundamentals of modern biotechnology and genetic engineering',
        instructor: { id: '1', name: 'Dr. Sarah Ahmed' },
        department: 'Biotechnology',
        level: 'beginner',
        duration_weeks: 8,
        thumbnail_url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
        rating: 4.8,
        enrolled_count: 1245,
      },
      {
        id: '2',
        title: 'Genomics and Bioinformatics',
        description: 'Advanced genomic analysis techniques and computational biology',
        instructor: { id: '2', name: 'Dr. Mohamed Hassan' },
        department: 'Genomics',
        level: 'intermediate',
        duration_weeks: 12,
        thumbnail_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400',
        rating: 4.9,
        enrolled_count: 892,
      },
      {
        id: '3',
        title: 'AI-Powered Diagnostics',
        description: 'Machine learning applications in medical diagnostics',
        instructor: { id: '3', name: 'Dr. Layla Ibrahim' },
        department: 'AI in Healthcare',
        level: 'advanced',
        duration_weeks: 10,
        thumbnail_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
        rating: 4.7,
        enrolled_count: 654,
      },
      {
        id: '4',
        title: 'Molecular Biology Essentials',
        description: 'Core concepts in molecular biology and cellular processes',
        instructor: { id: '4', name: 'Dr. Ahmed Khalil' },
        department: 'Medical Sciences',
        level: 'beginner',
        duration_weeks: 6,
        thumbnail_url: 'https://images.unsplash.com/photo-1578496479531-32e296d6c977?w=400',
        rating: 4.6,
        enrolled_count: 1567,
      },
      {
        id: '5',
        title: 'Pharmaceutical Development',
        description: 'Drug discovery and pharmaceutical research methods',
        instructor: { id: '5', name: 'Dr. Fatima Ali' },
        department: 'Pharmaceutical Sciences',
        level: 'advanced',
        duration_weeks: 14,
        thumbnail_url: 'https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=400',
        rating: 4.8,
        enrolled_count: 723,
      },
      {
        id: '6',
        title: 'Clinical Research Methods',
        description: 'Evidence-based research and clinical trial design',
        instructor: { id: '6', name: 'Dr. Omar Mansour' },
        department: 'Medical Sciences',
        level: 'intermediate',
        duration_weeks: 10,
        thumbnail_url: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=400',
        rating: 4.7,
        enrolled_count: 891,
      },
    ];

    setCourses(mockCourses);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
        <p className="text-gray-600">Explore our comprehensive life sciences programs</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            <span>Filters</span>
          </button>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="card hover:shadow-lg transition-shadow"
          >
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded capitalize">
                {course.level}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{course.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>{course.instructor.name}</span>
              <span>{course.duration_weeks} weeks</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{course.rating}</span>
                <span className="text-gray-500">({course.enrolled_count})</span>
              </div>
              <button className="btn-primary text-sm py-2">Enroll Now</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
