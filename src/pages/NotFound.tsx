import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">404: Page Not Found</h1>
      <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
