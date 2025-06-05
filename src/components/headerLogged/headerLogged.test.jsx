import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeaderLogged from './HeaderLogged';

describe('HeaderLogged integration', () => {
  test('renders logo and avatar', () => {
    render(<HeaderLogged />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Travel4Real/i)).toBeInTheDocument();
    expect(screen.getByAltText(/User Avatar/i)).toBeInTheDocument();
  });

  test('renders search input and filter select', () => {
    render(<HeaderLogged />, { wrapper: MemoryRouter });
    expect(screen.getByPlaceholderText(/Search experiences.../i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText(/Filter/i)).toBeInTheDocument();
  });

  test('renders dropdown menu links', () => {
    render(<HeaderLogged />, { wrapper: MemoryRouter });
    expect(screen.getAllByText(/Home/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Add Experience/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Profile/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Logout/i)[0]).toBeInTheDocument();
  });
});