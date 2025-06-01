import axios from "axios";

export class AuthService {
  baseUrl = "http://localhost:8080/api/auth";

  async login(credentials) {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }
}
