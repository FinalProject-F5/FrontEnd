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
    localStorage.removeItem("user", JSON.stringify(response.data)); // response.data.token
  }
}