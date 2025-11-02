import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { User } from './types';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CourseCatalogPage from './pages/CourseCatalogPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AIPartnerPage from './pages/AIPartnerPage';
import VirtualLabPage from './pages/VirtualLabPage';
import AdminPage from './pages/AdminPage';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Fetch user profile
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data as User);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading TELsTP Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={user ? <MainLayout user={user} /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<DashboardPage user={user!} />} />
          <Route path="/courses" element={<CourseCatalogPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/ai-partner" element={<AIPartnerPage user={user!} />} />
          <Route path="/labs/:id" element={<VirtualLabPage />} />
          {user?.role === 'admin' && (
            <Route path="/admin" element={<AdminPage />} />
          )}
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
