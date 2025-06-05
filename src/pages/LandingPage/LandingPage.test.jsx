import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage integration', () => {
  test('renders header, hero section, cards, and footer', () => {
    render(<LandingPage />, { wrapper: MemoryRouter });

    // Header logo
    expect(screen.getByRole('link', { name: /Travel4Real/i })).toBeInTheDocument();

    // Hero section
    expect(
      screen.getByText(/Find your next Experience and get inspired by locals/i)
    ).toBeInTheDocument();

    // Section title and description
    expect(screen.getByText(/Your Journey Starts Here!/i)).toBeInTheDocument();
    expect(screen.getByText(/Beyond the Usual/i)).toBeInTheDocument();
    expect(screen.getByText(/Local Inspiration Awaits, here our latest experiences/i)).toBeInTheDocument();

    // Cards (check a few titles)
    expect(screen.getByText(/Forest Brews & Village Flavours/i)).toBeInTheDocument();
    expect(screen.getByText(/Painting with locals/i)).toBeInTheDocument();
    expect(screen.getByText(/Cooking in the desert/i)).toBeInTheDocument();

    // Footer
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`Travel4Real © ${year} All rights reserved`)
    ).toBeInTheDocument();
  });
});