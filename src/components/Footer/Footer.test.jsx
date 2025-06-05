import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer integration', () => {
  test('muestra los enlaces de navegación', () => {
    render(<Footer />, { wrapper: MemoryRouter });
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Add Experience')).toBeInTheDocument();
  });

  test('muestra el texto de copyright con el año actual', () => {
    render(<Footer />, { wrapper: MemoryRouter });
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`Travel4Real © ${year} All rights reserved`)
    ).toBeInTheDocument();
  });

  test('muestra los íconos sociales con los enlaces correctos', () => {
    render(<Footer />, { wrapper: MemoryRouter });
    expect(screen.getByRole('link', { name: /youtube/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/'
    );
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute(
      'href',
      'https://www.instagram.com/'
    );
    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute(
      'href',
      'https://www.facebook.com/'
    );
  });
});