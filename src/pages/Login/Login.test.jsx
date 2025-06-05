import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("Login page integration", () => {
  test("renders header, login form, and footer", () => {
    render(<Login />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole("link", { name: /Travel4Real/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    expect(screen.getByText(/sign up here/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`Travel4Real © ${year} All rights reserved`)
    ).toBeInTheDocument();
  });
});
