import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Error from '../pages/Error';

describe('Error Page', () => {
  it('should display the invalid postId', () => {
    const postId = '123';
    render(
      <MemoryRouter initialEntries={[`/error/${postId}`]}>
        <Routes>
          <Route path="/error/:postId" element={<Error />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(`Invalid postId: ${postId}`)).toBeInTheDocument();
  });

  it('should have a link to go to home', () => {
    render(
      <MemoryRouter initialEntries={['/error/123']}>
        <Routes>
          <Route path="/error/:postId" element={<Error />} />
        </Routes>
      </MemoryRouter>
    );

    const linkElement = screen.getByText('Go to Home');
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});
