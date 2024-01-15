import React from 'react';

interface Props {
    status: any;
    endpointList: any;
}

const ServiceCard: React.FC<Props> = ({ status, endpointList }) => {
    
    return (
        <div className="flex flex-wrap justify-center mt-10">

            {endpointList.map((api:any) => (

                <div key={api.serviceName} className="p-4 max-w-sm">
                    <div className={status && status[api.serviceName] && status[api.serviceName].success ? 'healthyStatus' : 'deprecatedStatus'}>
                        <div className="flex items-center mb-3">
                            <div
                                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-white-500 text-white flex-shrink-0">
                            </div>
                            <h2 className="text-white dark:text-white text-lg font-medium">{api.serviceName}</h2>
                        </div>
                        <div className="flex flex-col justify-between flex-grow">
                            <p className="leading-relaxed text-base text-white">
                                {
                                    status && status[api.serviceName] && status[api.serviceName].success ? 'HEALTHY' : 'ERROR'
                                }
                            </p>
                            <p className="leading-relaxed text-base text-white">
                                {
                                    status && status[api.serviceName] && status[api.serviceName].success ? status[api.serviceName].hostname : 'OUTAGE 403 Forbidden'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            ))}


        </div>

    );
};

export default ServiceCard;