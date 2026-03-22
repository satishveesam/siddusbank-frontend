import React, { useState } from 'react';
import api from '../services/api';

const TestConnection = () => {
  const [status, setStatus] = useState('Not tested');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // end points
      const response = await api.get('/auth/test');
      setStatus(`✅ Connected! Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      if (error.response) {
        setStatus(`❌ Server responded with status: ${error.response.status}`);
      } else if (error.request) {
        setStatus(`❌ No response from server. Make sure backend is running on port 3636`);
      } else {
        setStatus(`❌ Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Backend Connection Test</h2>
      <button onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test Connection'}
      </button>
      <p>Status: {status}</p>
      <p>Backend URL: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
};

export default TestConnection;