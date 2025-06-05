import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Login page integration", () => {
  test("renders header, login form, and footer", () => {
    render(<Login />, { wrapper: MemoryRouter });

    // Header logo
    expect(
      screen.getByRole("link", { name: /Travel4Real/i })
    ).toBeInTheDocument();

    // Title
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    // Email input
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // Password input
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Login button
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    // Register and forgot password links
    expect(screen.getByText(/sign up here/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();


    const year = new Date().getFullYear();
    expect(
      screen.getByText(`Travel4Real © ${year} All rights reserved`)
    ).toBeInTheDocument();
  });
});