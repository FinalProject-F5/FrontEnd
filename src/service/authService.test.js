import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import { AuthService } from "./authService";
import axios from "axios";

export class AuthService {
  baseUrl = "http://localhost:8080/api/auth";

  async login(credentials) {
    const response = await axios.post(`${this.baseUrl}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
    return null;
  }

  async register(userData) {
    const requestData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      countryCode: userData.countryCode || "ES",
    };
    const response = await axios.post(`${this.baseUrl}/register`, requestData);
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }
}


vi.mock("axios");

describe("AuthService (unit)", () => {
  let service;

  beforeEach(() => {
    service = new AuthService();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("login stores user and returns data when token exists", async () => {
    const credentials = { email: "test@test.com", password: "12345678" };
    const mockResponse = { data: { token: "abc123", user: { name: "Test" } } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await service.login(credentials);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/login",
      credentials
    );
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(mockResponse.data));
    expect(result).toEqual(mockResponse.data);
  });

  test("login returns null if no token", async () => {
    const credentials = { email: "test@test.com", password: "12345678" };
    const mockResponse = { data: {} };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await service.login(credentials);

    expect(result).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });

  test("register posts user data and returns response", async () => {
    const userData = { name: "Test", email: "test@test.com", password: "12345678" };
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await service.register(userData);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/register",
      expect.objectContaining({
        name: "Test",
        email: "test@test.com",
        password: "12345678",
        countryCode: "ES"
      })
    );
    expect(result).toEqual({ success: true });
  });

  test("logout removes user from localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ token: "abc" }));
    service.logout();
    expect(localStorage.getItem("user")).toBeNull();
  });
});