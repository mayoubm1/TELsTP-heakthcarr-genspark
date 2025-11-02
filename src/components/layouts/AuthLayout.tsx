import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
