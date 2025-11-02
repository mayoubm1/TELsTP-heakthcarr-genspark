import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  FlaskConical, 
  Bot, 
  Calendar, 
  Award, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Shield
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { User } from '../../types';

interface MainLayoutProps {
  user: User;
}

export default function MainLayout({ user }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Course Catalog', href: '/courses', icon: BookOpen },
    { name: 'Virtual Labs', href: '/labs', icon: FlaskConical },
    { name: 'AI Partner', href: '/ai-partner', icon: Bot },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Achievements', href: '/achievements', icon: Award },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl text-gray-900">TELsTP</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses, labs, resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">{user.name.charAt(0)}</span>
              </div>
              <div className="hidden md:block">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white shadow-lg transition-transform duration-300 z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
          
          {user.role === 'admin' && (
            <>
              <hr className="my-4" />
              <Link
                to="/admin"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/admin'
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield size={20} />
                <span>Admin Panel</span>
              </Link>
            </>
          )}

          <hr className="my-4" />
          
          <Link
            to="/settings"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
