import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostDropdown from '../components/PostDropdown';

import styles from './Posts.module.css';

interface Post {
  id: number;
  title: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    };

    fetchData();
  }, []);

  const handlePostSelect = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className={styles.posts}>
      <h1>Select a Post</h1>
      <PostDropdown posts={posts} onSelect={handlePostSelect} />
    </div>
  );
};

export default Posts;
