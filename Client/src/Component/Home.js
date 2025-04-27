import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-rose-50 p-6">
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-10 border border-rose-100">
                <h1 className="text-4xl font-bold text-rose-600 mb-8 text-center">HR Service</h1>
                
                <div>
                    <h3 className="text-2xl font-semibold text-rose-700 mb-4">Project Overview</h3>
                    <ol className="list-decimal list-inside space-y-4 text-gray-700">
                        <li>
                            This project integrates the frontend through an API Gateway (Node.js) with RabbitMQ (RMQ), using a PUB-SUB messaging model to interact with a background HR Service.
                        </li>
                        <li>
                            The React application includes three main screens:
                            <ol className="list-decimal list-inside ml-6 mt-2 space-y-2 text-gray-600">
                                <li>Employee Management: Add, edit, delete, and list employees.</li>
                                <li>Department Management: Add, edit, delete, and list departments.</li>
                                <li>Employee-Department Mapping: Manage associations between employees and departments.</li>
                            </ol>
                        </li>
                        <li>
                            The API Gateway, built with Node.js, communicates with the backend services using RMQ and WebSockets.
                        </li>
                        <li>
                            The application functions as a centralized gateway, handling requests from the frontend and dispatching them to appropriate services based on demand.
                        </li>
                        <li>
                            The HR Service itself is developed using NestJS and leverages TypeORM for database operations.
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
