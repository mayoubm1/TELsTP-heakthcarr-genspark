import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Hash, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    program: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const programs = [
    'Biotechnology',
    'Medical Sciences',
    'AI in Healthcare',
    'Analytical Sciences',
    'Genomics and Bioinformatics',
    'Pharmaceutical Sciences',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Create user profile
      if (authData.user) {
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          email: formData.email,
          name: formData.name,
          role: 'student',
          student_id: formData.studentId,
          program: formData.program,
        });

        if (profileError) throw profileError;
      }

      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Join the TELsTP learning community</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="Mohamed Ayoub"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
                Student ID
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="TEL2024001"
                />
              </div>
            </div>

            <div>
              <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mb-2">
                Program
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  required
                  className="input-field pl-10 appearance-none"
                >
                  <option value="">Select Program</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
