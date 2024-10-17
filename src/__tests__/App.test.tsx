import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../pages/Posts.tsx', () => () => <div>Posts Page</div>);
jest.mock('../pages/PostDetails', () => () => <div>Post Details Page</div>);
jest.mock('../pages/Error', () => () => <div>Error Page</div>);
jest.mock('../pages/NotFound', () => () => <div>Not Found Page</div>);

describe('App', () => {
  it('renders Posts component for root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Posts Page')).toBeInTheDocument();
  });

  it('renders PostDetails component for /posts/:postId path', () => {
    render(
      <MemoryRouter initialEntries={['/posts/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Post Details Page')).toBeInTheDocument();
  });

  it('renders Error component for /error path', () => {
    render(
      <MemoryRouter initialEntries={['/error']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Error Page')).toBeInTheDocument();
  });

  it('renders NotFound component for unknown paths', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
