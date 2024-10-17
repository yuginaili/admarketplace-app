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
    <div className="w-full max-w-xs mt-8 relative">
      <select
        className="w-full p-4 bg-gray-200 text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
        onChange={e => onSelect(Number(e.target.value))}
        value={selectedPostId || ''}
      >
        <option value="" className="text-gray-500">
          Select a Post
        </option>
        {posts.map(post => (
          <option key={post.id} value={post.id} className="text-gray-700">
            {post.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PostDropdown;
