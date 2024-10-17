import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  body: string;
}

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', body: '', email: '' });

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`),
          axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`),
        ]);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
        ...newComment,
        postId,
      });
      setComments([...comments, response.data]);
      setNewComment({ name: '', body: '', email: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!post)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Invalid postId: {postId}</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Go to Home
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:text-blue-700 underline mb-4 inline-block">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>
      <p className="text-lg mb-6">{post.body}</p>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className="bg-gray-100 p-4 rounded-lg mb-4">
          <p>
            <strong className="font-medium">{comment.name}</strong>: {comment.body}
          </p>
        </div>
      ))}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Add Comment</h3>
        <input
          type="text"
          placeholder="Name"
          value={newComment.name}
          onChange={e => setNewComment({ ...newComment, name: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newComment.email}
          onChange={e => setNewComment({ ...newComment, email: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Comment"
          value={newComment.body}
          onChange={e => setNewComment({ ...newComment, body: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
