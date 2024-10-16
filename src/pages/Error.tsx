import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Error: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div>
      <h1>Invalid postId: {postId}</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Error;
