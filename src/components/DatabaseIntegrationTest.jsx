import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseIntegrationTest = () => {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  const runDatabaseTest = async () => {
    setLoading(true);
    setError(null);
    
    const tests = [];

    try {
      // Test 1: Database Health Check
      console.log('🔍 Testing database health...');
      const healthResponse = await axios.get(`${API_BASE_URL}/core/database/health/`);
      tests.push({
        name: 'Database Health Check',
        status: healthResponse.status === 200 ? 'PASS' : 'FAIL',
        result: healthResponse.data,
        details: `PostgreSQL Version: ${healthResponse.data.data?.postgresql_version || 'Unknown'}`
      });

      // Test 2: API Connection Test
      console.log('🔍 Testing API connection...');
      const apiResponse = await axios.get(`${API_BASE_URL.replace('/api', '')}/health/`);
      tests.push({
        name: 'API Health Check',
        status: apiResponse.status === 200 ? 'PASS' : 'FAIL',
        result: apiResponse.data,
        details: `Service: ${apiResponse.data.service || 'Unknown'}`
      });

      // Test 3: Test authenticated endpoint (requires login)
      try {
        console.log('🔍 Testing authenticated endpoints...');
        const token = localStorage.getItem('token');
        if (token) {
          const authResponse = await axios.get(`${API_BASE_URL}/core/categories/`, {
            headers: { Authorization: `Token ${token}` }
          });
          tests.push({
            name: 'Authenticated API Access',
            status: authResponse.status === 200 ? 'PASS' : 'FAIL',
            result: authResponse.data,
            details: `Categories found: ${authResponse.data.results?.length || authResponse.data.length || 0}`
          });
        } else {
          tests.push({
            name: 'Authenticated API Access',
            status: 'SKIP',
            result: null,
            details: 'No authentication token found (user not logged in)'
          });
        }
      } catch (authError) {
        tests.push({
          name: 'Authenticated API Access',
          status: 'FAIL',
          result: null,
          details: `Authentication failed: ${authError.response?.data?.detail || authError.message}`
        });
      }

      setTestResults({
        timestamp: new Date().toISOString(),
        apiUrl: API_BASE_URL,
        tests: tests,
        summary: {
          total: tests.length,
          passed: tests.filter(t => t.status === 'PASS').length,
          failed: tests.filter(t => t.status === 'FAIL').length,
          skipped: tests.filter(t => t.status === 'SKIP').length
        }
      });

    } catch (err) {
      console.error('Database integration test failed:', err);
      setError({
        message: err.message,
        details: err.response?.data || err.response?.statusText || 'Unknown error',
        status: err.response?.status || 'No response'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-run test on component mount
    runDatabaseTest();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PASS': return 'text-green-600 bg-green-100';
      case 'FAIL': return 'text-red-600 bg-red-100';
      case 'SKIP': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PASS': return '✅';
      case 'FAIL': return '❌';
      case 'SKIP': return '⚠️';
      default: return '❓';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            🔍 Database Integration Test
          </h2>
          <button
            onClick={runDatabaseTest}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium"
          >
            {loading ? '🔄 Testing...' : '🔄 Run Test'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h3 className="font-bold mb-2">❌ Test Failed</h3>
            <p className="mb-2"><strong>Error:</strong> {error.message}</p>
            <p className="mb-2"><strong>Status:</strong> {error.status}</p>
            <p><strong>Details:</strong> {JSON.stringify(error.details, null, 2)}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Running database integration tests...</p>
          </div>
        )}

        {testResults && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">📊 Test Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{testResults.summary.total}</div>
                  <div className="text-sm text-gray-600">Total Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{testResults.summary.passed}</div>
                  <div className="text-sm text-gray-600">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{testResults.summary.failed}</div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{testResults.summary.skipped}</div>
                  <div className="text-sm text-gray-600">Skipped</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>API URL:</strong> {testResults.apiUrl}</p>
                <p><strong>Test Time:</strong> {new Date(testResults.timestamp).toLocaleString()}</p>
              </div>
            </div>

            {/* Test Results */}
            <div>
              <h3 className="text-lg font-semibold mb-3">🧪 Test Results</h3>
              <div className="space-y-3">
                {testResults.tests.map((test, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{test.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(test.status)}`}>
                        {getStatusIcon(test.status)} {test.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{test.details}</p>
                    {test.result && (
                      <details className="text-xs">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                          Show Raw Response
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
                          {JSON.stringify(test.result, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">🔗 Integration Status</h3>
              {testResults.summary.failed === 0 ? (
                <div className="text-green-700">
                  <p className="mb-2">🎉 <strong>All systems operational!</strong></p>
                  <p>✅ PostgreSQL database is connected and working</p>
                  <p>✅ Backend API is responding correctly</p>
                  <p>✅ Frontend can communicate with the backend</p>
                  <p className="mt-2 text-sm">Your Railway PostgreSQL database is properly integrated with both backend and frontend!</p>
                </div>
              ) : (
                <div className="text-red-700">
                  <p className="mb-2">⚠️ <strong>Integration issues detected</strong></p>
                  <p>Some tests failed. Please check the results above and ensure:</p>
                  <ul className="list-disc list-inside mt-2 text-sm">
                    <li>Railway PostgreSQL service is running</li>
                    <li>Backend deployment is successful</li>
                    <li>Environment variables are set correctly</li>
                    <li>Network connectivity is available</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseIntegrationTest;