"use client";

import { useState } from 'react';

const EmailTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendTestEmail = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Email Test',
          message: 'This is a test message to verify email functionality is working correctly.'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setTestResult({ type: 'success', message: 'Test email sent successfully! Check your inbox at gokul@addtocloud.tech' });
      } else {
        setTestResult({ type: 'error', message: result.error || 'Failed to send test email' });
      }
    } catch (error) {
      setTestResult({ type: 'error', message: 'Network error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Email Service Test</h3>
      
      <button
        onClick={sendTestEmail}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Sending...' : 'Send Test Email'}
      </button>

      {testResult && (
        <div className={`mt-4 p-3 rounded-lg ${
          testResult.type === 'success' 
            ? 'bg-green-100 border border-green-300 text-green-700'
            : 'bg-red-100 border border-red-300 text-red-700'
        }`}>
          {testResult.message}
        </div>
      )}

      <p className="text-sm text-gray-600 mt-4">
        This will send a test email to verify your email service configuration.
      </p>
    </div>
  );
};

export default EmailTest;
