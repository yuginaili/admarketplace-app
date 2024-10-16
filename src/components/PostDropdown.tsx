import React from 'react';

interface Post {
  id: number;
  title: string;
}

interface Props {
  posts: Post[];
  onSelect: (postId: number) => void;
  selectedPostId?: number;
}

const PostDropdown: React.FC<Props> = ({ posts, onSelect, selectedPostId }) => {
  return (
    <select onChange={e => onSelect(Number(e.target.value))} value={selectedPostId || ''}>
      <option value="">Select a Post</option>
      {posts.map(post => (
        <option key={post.id} value={post.id}>
          {post.title}
        </option>
      ))}
    </select>
  );
};

export default PostDropdown;
