import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiList = [
  'accounts', 'assets', 'customers', 'datapoints', 'devices',
  'documents', 'forms', 'invites', 'media', 'messages',
  'namespaces', 'orders', 'patients', 'relationships',
  'rules', 'templates', 'users', 'workflows'
];

function App() {
  const [status, setStatus] = useState<{ [key: string]: any }>({});

  
  const getStatus = async () => {
    const newStatus: { [key: string]: any } = {};

    // We call the status endpoint dynamically. 
    for (const apiName of apiList) {
      try {
        const response = await axios.get(`https://api.factoryfour.com/${apiName}/health/status`);
        newStatus[apiName] = response.data;
      } catch (error) {
        // If the API is deprecated, an status error is going to be simulated.
        newStatus[apiName] = { success: false, message: '503 Service Unavailable', hostname: 'Deprecated', time: Date.now() };
      }
    }

    // Actualiza el estado con los resultados más recientes
    setStatus(newStatus);
  };

  // We hook a timer when app is loaded first time. 
  useEffect(() => {
    const intervalId = setInterval(getStatus, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <></>
  );
}

export default App;
