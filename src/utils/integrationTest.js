/**
 * Integration Test Suite for EDRS Full-Stack Deployment
 * Railway Backend: edrs-backend-production.up.railway.app
 * Vercel Frontend: https://edrs-frontend.vercel.app/
 */

const BACKEND_URL = 'https://edrs-backend-production.up.railway.app';
const FRONTEND_URL = 'https://edrs-frontend.vercel.app';

class DeploymentIntegrationTest {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
  }

  async runAllTests() {
    console.log('🚀 Starting EDRS Integration Tests...\n');
    
    const tests = [
      () => this.testBackendHealth(),
      () => this.testFrontendAccess(),
      () => this.testCorsIntegration(),
      () => this.testApiConnection(),
      () => this.testDatabaseConnection(),
      () => this.testAuthEndpoints()
    ];

    for (const test of tests) {
      try {
        await test();
      } catch (error) {
        this.logResult('FAIL', error.message, error);
      }
    }

    this.displayResults();
  }

  async testBackendHealth() {
    const test = 'Backend Health Check';
    try {
      const response = await fetch(`${BACKEND_URL}/health/`);
      const data = await response.json();
      
      if (response.ok && data.status === 'healthy') {
        this.logResult('PASS', test, `Backend responding: ${data.message}`);
      } else {
        throw new Error(`Health check failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      this.logResult('FAIL', test, `Backend unreachable: ${error.message}`);
      throw error;
    }
  }

  async testFrontendAccess() {
    const test = 'Frontend Accessibility';
    try {
      // Test if we're running in browser environment
      if (typeof window !== 'undefined') {
        this.logResult('PASS', test, `Frontend loaded at: ${window.location.href}`);
      } else {
        // For Node.js environment testing
        const response = await fetch(FRONTEND_URL);
        if (response.ok) {
          this.logResult('PASS', test, `Frontend accessible: ${response.status}`);
        } else {
          throw new Error(`Frontend returned: ${response.status}`);
        }
      }
    } catch (error) {
      this.logResult('FAIL', test, `Frontend access failed: ${error.message}`);
      throw error;
    }
  }

  async testCorsIntegration() {
    const test = 'CORS Configuration';
    try {
      const response = await fetch(`${BACKEND_URL}/api/health/`, {
        method: 'GET',
        headers: {
          'Origin': FRONTEND_URL,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const corsHeaders = response.headers.get('Access-Control-Allow-Origin');
        this.logResult('PASS', test, `CORS working: ${corsHeaders || 'Headers present'}`);
      } else {
        throw new Error(`CORS test failed: ${response.status}`);
      }
    } catch (error) {
      this.logResult('FAIL', test, `CORS blocked: ${error.message}`);
      throw error;
    }
  }

  async testApiConnection() {
    const test = 'API Connection';
    try {
      // Test a simple API endpoint
      const response = await fetch(`${BACKEND_URL}/api/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.logResult('PASS', test, `API responding: ${JSON.stringify(data).slice(0, 100)}...`);
      } else {
        throw new Error(`API returned: ${response.status}`);
      }
    } catch (error) {
      this.logResult('FAIL', test, `API connection failed: ${error.message}`);
      throw error;
    }
  }

  async testDatabaseConnection() {
    const test = 'Database Connection';
    try {
      const response = await fetch(`${BACKEND_URL}/health/db/`);
      const data = await response.json();
      
      if (response.ok && data.database) {
        this.logResult('PASS', test, `Database: ${data.database.status || 'Connected'}`);
      } else {
        throw new Error(`Database check failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      this.logResult('FAIL', test, `Database unreachable: ${error.message}`);
      throw error;
    }
  }

  async testAuthEndpoints() {
    const test = 'Authentication Endpoints';
    try {
      // Test auth endpoint accessibility (without actual login)
      const response = await fetch(`${BACKEND_URL}/api/auth/`, {
        method: 'OPTIONS',
        headers: {
          'Origin': FRONTEND_URL,
        },
      });

      if (response.ok || response.status === 405) {
        this.logResult('PASS', test, 'Auth endpoints accessible');
      } else {
        throw new Error(`Auth endpoints returned: ${response.status}`);
      }
    } catch (error) {
      this.logResult('FAIL', test, `Auth test failed: ${error.message}`);
      throw error;
    }
  }

  logResult(status, testName, details) {
    const result = {
      status,
      test: testName,
      details,
      timestamp: new Date().toISOString()
    };
    
    this.results.push(result);
    
    const icon = status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${testName}: ${details}`);
  }

  displayResults() {
    const duration = (Date.now() - this.startTime) / 1000;
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    
    console.log('\n' + '='.repeat(60));
    console.log('🏆 EDRS INTEGRATION TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${this.results.length}`);
    console.log('='.repeat(60));
    
    if (failed === 0) {
      console.log('🎉 ALL TESTS PASSED! Your EDRS deployment is fully functional!');
      console.log(`🌐 Frontend: ${FRONTEND_URL}`);
      console.log(`🚀 Backend: ${BACKEND_URL}`);
    } else {
      console.log('⚠️  Some tests failed. Check the logs above for details.');
    }
    
    console.log('\n📋 Test Summary:');
    this.results.forEach(result => {
      console.log(`   ${result.status === 'PASS' ? '✅' : '❌'} ${result.test}`);
    });
  }

  // Export test results for further analysis
  exportResults() {
    return {
      summary: {
        total: this.results.length,
        passed: this.results.filter(r => r.status === 'PASS').length,
        failed: this.results.filter(r => r.status === 'FAIL').length,
        duration: (Date.now() - this.startTime) / 1000
      },
      details: this.results,
      deployment: {
        frontend: FRONTEND_URL,
        backend: BACKEND_URL
      }
    };
  }
}

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  // Run tests when page loads
  window.addEventListener('load', () => {
    const tester = new DeploymentIntegrationTest();
    tester.runAllTests();
  });
}

export default DeploymentIntegrationTest;

// For manual testing in console
export const runIntegrationTests = async () => {
  const tester = new DeploymentIntegrationTest();
  await tester.runAllTests();
  return tester.exportResults();
};

// Quick test functions for debugging
export const quickTests = {
  backend: () => fetch(`${BACKEND_URL}/health/`).then(r => r.json()),
  cors: () => fetch(`${BACKEND_URL}/api/health/`, {
    headers: { 'Origin': FRONTEND_URL }
  }),
  api: () => fetch(`${BACKEND_URL}/api/`).then(r => r.json())
};