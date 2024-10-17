import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import axios from 'axios';
import Posts from '../pages/Posts';

jest.mock('axios');
jest.mock('../components/PostDropdown', () => {
  const PostDropdown = ({
    posts,
    onSelect,
  }: {
    posts: { id: number; title: string }[];
    onSelect: (id: number) => void;
  }) => (
    <div data-testid="post-dropdown">
      {posts.map(post => (
        <div key={post.id} onClick={() => onSelect(post.id)}>
          {post.title}
        </div>
      ))}
    </div>
  );
  PostDropdown.displayName = 'PostDropdown';
  return PostDropdown;
});

describe('Posts Page', () => {
  it('fetches and displays posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockPosts });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Posts />
      </Router>,
    );

    await screen.findByText('Post 1');
    await screen.findByText('Post 2');
  });

  it('navigates to the selected post', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockPosts });

    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Posts />
      </Router>,
    );

    await screen.findByText('Post 1');
    screen.getByText('Post 1').click();

    expect(history.location.pathname).toBe('/posts/1');
  });
});
