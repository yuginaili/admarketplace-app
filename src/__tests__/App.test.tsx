import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../pages/Posts.tsx', () => {
  const MockPosts = () => <div>Posts Page</div>;
  MockPosts.displayName = 'MockPosts';
  return MockPosts;
});
jest.mock('../pages/PostDetails', () => {
  const MockPostDetails = () => <div>Post Details Page</div>;
  MockPostDetails.displayName = 'MockPostDetails';
  return MockPostDetails;
});
jest.mock('../pages/NotFound', () => {
  const MockNotFound = () => <div>Not Found Page</div>;
  MockNotFound.displayName = 'MockNotFound';
  return MockNotFound;
});

describe('App', () => {
  it('renders Posts component for root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Posts Page')).toBeTruthy();
  });

  it('renders PostDetails component for /posts/:postId path', () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Post Details Page')).toBeInTheDocument();
  });

  it('renders NotFound component for unknown paths', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
