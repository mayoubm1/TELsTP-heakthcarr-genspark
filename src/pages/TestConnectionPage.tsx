import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function TestConnectionPage() {
  const [results, setResults] = useState<any>({});
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const testResults: any = {};

    // Test 1: Environment Variables
    testResults.envVars = {
      url: import.meta.env.VITE_SUPABASE_URL || 'NOT SET',
      keyExists: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      keyPreview: import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
    };

    // Test 2: Supabase Connection
    try {
      const { data, error } = await supabase.from('courses').select('count').limit(1);
      testResults.dbConnection = {
        success: !error,
        error: error?.message,
        data,
      };
    } catch (err: any) {
      testResults.dbConnection = {
        success: false,
        error: err.message,
      };
    }

    // Test 3: Auth API
    try {
      const { data, error } = await supabase.auth.getSession();
      testResults.authApi = {
        success: !error,
        error: error?.message,
        hasSession: !!data.session,
      };
    } catch (err: any) {
      testResults.authApi = {
        success: false,
        error: err.message,
      };
    }

    // Test 4: Test Signup (with fake email)
    try {
      const testEmail = `test-${Date.now()}@test.com`;
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'TestPassword123!',
        options: {
          data: {
            name: 'Test User',
            role: 'student',
          },
        },
      });
      
      testResults.signup = {
        success: !error,
        error: error?.message,
        userId: data.user?.id,
      };

      // Clean up test user if successful
      if (data.user) {
        await supabase.auth.admin.deleteUser(data.user.id);
      }
    } catch (err: any) {
      testResults.signup = {
        success: false,
        error: err.message,
      };
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="text-green-500" size={24} />
    ) : (
      <XCircle className="text-red-500" size={24} />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">🔍 TELsTP Connection Test</h1>

          <button
            onClick={runTests}
            disabled={testing}
            className="btn-primary mb-6 disabled:opacity-50"
          >
            {testing ? 'Testing...' : 'Run All Tests'}
          </button>

          {Object.keys(results).length > 0 && (
            <div className="space-y-6">
              {/* Environment Variables */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(!!results.envVars?.url && results.envVars?.keyExists)}
                  <h2 className="text-xl font-bold">1. Environment Variables</h2>
                </div>
                <div className="ml-9 space-y-2 text-sm">
                  <p>
                    <strong>Supabase URL:</strong>{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {results.envVars?.url}
                    </code>
                  </p>
                  <p>
                    <strong>Anon Key:</strong>{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {results.envVars?.keyPreview}
                    </code>
                  </p>
                </div>
              </div>

              {/* Database Connection */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(results.dbConnection?.success)}
                  <h2 className="text-xl font-bold">2. Database Connection</h2>
                </div>
                <div className="ml-9 text-sm">
                  {results.dbConnection?.success ? (
                    <p className="text-green-600">✅ Database connected successfully!</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-red-600">❌ Database connection failed</p>
                      <p className="bg-red-50 p-3 rounded">
                        <strong>Error:</strong> {results.dbConnection?.error}
                      </p>
                      <div className="bg-yellow-50 p-3 rounded">
                        <AlertCircle className="inline mr-2" size={16} />
                        <strong>Solution:</strong> Apply database migrations in Supabase Dashboard
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Auth API */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(results.authApi?.success)}
                  <h2 className="text-xl font-bold">3. Authentication API</h2>
                </div>
                <div className="ml-9 text-sm">
                  {results.authApi?.success ? (
                    <p className="text-green-600">✅ Auth API is working!</p>
                  ) : (
                    <p className="text-red-600">❌ Auth API failed: {results.authApi?.error}</p>
                  )}
                </div>
              </div>

              {/* Signup Test */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(results.signup?.success)}
                  <h2 className="text-xl font-bold">4. User Registration</h2>
                </div>
                <div className="ml-9 text-sm">
                  {results.signup?.success ? (
                    <div className="space-y-2">
                      <p className="text-green-600">✅ Registration is working!</p>
                      <p className="text-gray-600">Test user ID: {results.signup?.userId}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-red-600">❌ Registration failed</p>
                      <p className="bg-red-50 p-3 rounded">
                        <strong>Error:</strong> {results.signup?.error}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-100 rounded-lg p-4 mt-6">
                <h3 className="font-bold mb-2">📋 Summary</h3>
                {results.dbConnection?.success ? (
                  <p className="text-green-600">
                    ✅ All systems operational! You can use the platform.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-yellow-600">
                      ⚠️ Database needs setup. Follow these steps:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Go to Supabase Dashboard</li>
                      <li>Open SQL Editor</li>
                      <li>Run migration files (001, 002, 003)</li>
                      <li>Come back and test again</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
