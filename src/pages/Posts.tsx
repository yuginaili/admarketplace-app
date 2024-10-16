import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostDropdown from '../components/PostDropdown';

interface Post {
  id: number;
  title: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts', error));
  }, []);

  const handlePostSelect = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <h1>Select a Post</h1>
      <PostDropdown posts={posts} onSelect={handlePostSelect} />
    </div>
  );
};

export default Posts;
