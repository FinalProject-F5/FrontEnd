import axios from "axios";

export class AuthService {
  baseUrl = "http://localhost:8080/api/auth";

  async register(userData) {
    try {
      const requestData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        countryCode: userData.countryCode || 'ES'
      };

      const response = await axios.post(`${this.baseUrl}/register`, requestData);
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
      throw error;
    }
  }
}
