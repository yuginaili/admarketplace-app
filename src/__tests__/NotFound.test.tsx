import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';

describe('NotFound Page', () => {
  it('should render the 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText('404: Page Not Found')).toBeInTheDocument();
  });

  it('should have a link to the home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const linkElement = screen.getByText('Go to Home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});
