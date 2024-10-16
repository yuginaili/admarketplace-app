import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => setPost(response.data))
      .catch(() => navigate('/error'));

    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => setComments(response.data));
  }, [postId, navigate]);

  const handleCommentSubmit = () => {
    axios
      .post('https://jsonplaceholder.typicode.com/comments', { ...newComment, postId })
      .then(response => setComments([...comments, response.data]));
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>
            <strong>{comment.name}</strong>: {comment.body}
          </p>
        </div>
      ))}
      <div>
        <h3>Add Comment</h3>
        <input
          type="text"
          placeholder="Name"
          value={newComment.name}
          onChange={e => setNewComment({ ...newComment, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newComment.email}
          onChange={e => setNewComment({ ...newComment, email: e.target.value })}
        />
        <textarea
          placeholder="Comment"
          value={newComment.body}
          onChange={e => setNewComment({ ...newComment, body: e.target.value })}
        />
        <button onClick={handleCommentSubmit}>Post</button>
      </div>
    </div>
  );
};

export default PostDetails;
