import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import ServiceCard from './ServiceCard/ServiceCard';

interface StatusResponse {
  success: boolean;
  message: string;
  hostname: string;
  time: number;
}

interface EndpointConfig {
  serviceName: string;
  interval: number;
}

const endpointList: EndpointConfig[] = [
  { serviceName: 'accounts', interval: 15 }, 
  { serviceName: 'assets', interval: 15 },
  { serviceName: 'customers', interval: 10 },
  { serviceName: 'datapoints', interval: 15 },
  { serviceName: 'devices', interval: 15 },
  { serviceName: 'documents', interval: 15 },
  { serviceName: 'forms', interval: 15 },
  { serviceName: 'invites', interval: 15 },
  { serviceName: 'media', interval: 15 },
  { serviceName: 'messages', interval: 15 },
  { serviceName: 'namespaces', interval: 15 },
  { serviceName: 'patients', interval: 15 },
  { serviceName: 'relationships', interval: 15 },
  { serviceName: 'rules', interval: 15 },
  { serviceName: 'templates', interval: 15 },
  { serviceName: 'users', interval: 15 },
  { serviceName: 'workflows', interval: 15 }
];

const App: React.FC = () => {
  const [status, setStatus] = useState<{ [key: string]: StatusResponse | null }>({});

  
  const getStatus = async (endpointConfig:EndpointConfig) => {
    const { serviceName } = endpointConfig;

    try {
      const response: AxiosResponse<StatusResponse> = await axios.get(`https://api.factoryfour.com/${serviceName}/health/status`);
      setStatus((prevData) => ({
        ...prevData,
        [serviceName]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching data for ${serviceName}:`, error);
      setStatus((prevData) => ({
        ...prevData,
        [serviceName]: null,
      }));
    }
  };
  

  // We hook a timer when app is loaded first time. 
  useEffect(() => {
    const updateStatus = async () => {
      await Promise.allSettled(endpointList.map((endpointConfig) => getStatus(endpointConfig)));
    };

    updateStatus();

    const timers: NodeJS.Timeout[] = endpointList.map((endpointConfig) => {
      return setInterval(() => getStatus(endpointConfig), endpointConfig.interval * 1000);
    });
    
    

    
    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  return (
    <>
    <div className="flex flex-wrap justify-center mt-10">
      <ServiceCard endpointList={endpointList} status={status} />
      </div>
    </>
  );
}

export default App;
