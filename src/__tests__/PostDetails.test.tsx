import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetails from '../pages/PostDetails';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostDetails', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    body: 'This is a test post.',
  };

  const mockComments = [
    {
      id: 1,
      name: 'Test User',
      body: 'This is a test comment.',
    },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockPost });
    mockedAxios.get.mockResolvedValueOnce({ data: mockComments });
  });
  it('renders post details and comments', async () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(await screen.findByText(mockPost.title)).toBeInTheDocument();
    expect(
      await screen.findByText(
        (content, element) =>
          element !== null &&
          content.includes(mockComments[0].name) &&
          element.tagName.toLowerCase() === 'strong'
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        (content, element) =>
          element !== null &&
          content.includes(mockComments[0].body) &&
          element.tagName.toLowerCase() === 'p'
      )
    ).toBeInTheDocument();
  });

  it('handles adding a new comment', async () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <Routes>
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(mockPost.title);

    const commentTextarea = screen.getByPlaceholderText('Comment');
    const postButton = screen.getByText('Post');
    fireEvent.change(commentTextarea, { target: { value: 'This is a new comment.' } });

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: 2,
        name: 'New User',
        body: 'This is a new comment.',
      },
    });

    fireEvent.click(postButton);

    await screen.findByText('New User');
    await screen.findByText('This is a new comment.');
  });
});
