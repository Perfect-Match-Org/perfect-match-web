import React, { useState } from 'react';

export default function QuickTest() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testTemplateCreation = async () => {
    setLoading(true);
    setResult('');

    try {
      const testTemplate = {
        name: 'Test Template ' + Date.now(),
        description: 'Auto-generated test template',
        html_content: '<h1>Hello {{firstName}}!</h1><p>This is a test email.</p>',
        css_content: 'h1 { color: #FF328F; }',
        tags: ['test', 'auto-generated']
      };

      const response = await fetch('/api/admin/email/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testTemplate)
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Template created successfully! ID: ${data.template._id}`);
      } else {
        setResult(`❌ Failed to create template: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testUserFiltering = async () => {
    setLoading(true);
    setResult('');

    try {
      const filterData = {
        year: '2025',
        natural_query: 'users with no matches',
        filters: {}
      };

      const response = await fetch('/api/admin/email/users/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filterData)
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ User filtering works! Found ${data.count} users out of ${data.total} total (${data.percentage}%)`);
      } else {
        setResult(`❌ User filtering failed: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Email Marketing API Tests
      </h3>

      <div className="flex gap-3 mb-4">
        <button
          onClick={testTemplateCreation}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Template Creation'}
        </button>

        <button
          onClick={testUserFiltering}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test User Filtering'}
        </button>
      </div>

      {result && (
        <div className="p-3 rounded-lg bg-gray-50">
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}