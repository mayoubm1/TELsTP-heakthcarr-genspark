import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Dna, Microscope, Brain } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Left Side - Branding */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 p-12 text-white flex flex-col justify-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4">
            <span className="text-primary-500 font-bold text-2xl">T</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">TELsTP</h1>
          <p className="text-xl text-primary-100">Tawasol Egypt Life Science Technology Park</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Dna size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Advanced Biotechnology</h3>
              <p className="text-primary-100 text-sm">Cutting-edge courses in genomics, molecular biology, and bioengineering</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Microscope size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Virtual Laboratories</h3>
              <p className="text-primary-100 text-sm">Hands-on experience with 3D interactive lab simulations</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">AI-Powered Learning</h3>
              <p className="text-primary-100 text-sm">Personalized education with AI mentors specialized in life sciences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="p-12 flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field pl-10"
                placeholder="your.email@example.com"
              />
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            New to TELsTP?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              Create an account
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
