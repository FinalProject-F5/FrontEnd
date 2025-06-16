import axios from "axios";

export class Experiences {
  baseUrl = "http://localhost:8080/api/experiences";
  categoriesUrl = "http://localhost:8080/api/categories/all";
  countriesUrl = "http://localhost:8080/api/countries/all";

  getRequestOptions() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      headers: {
        ...(user && user.token
          ? { Authorization: `Bearer ${user.token}` }
          : {}),
        ...(user && user.id ? { "X-User-ID": user.id } : {}),
      },
    };
  }

  getAllExperiences() {
    console.log("Fetching all Experiences...");
    return axios
      .get(this.baseUrl, this.getRequestOptions())
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching Experiences:", error);
        throw error;
      });
  }


  searchExperiences(searchTerm) {
    return axios
      .get(`${this.baseUrl}/search`, {
        ...this.getRequestOptions(),
        params: { title: searchTerm.trim()},
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error searching Experiences:", error);
        throw error;
      });
  }

  getExperiencesById(id) {
    const url = `${this.baseUrl}/${id}`;
    return axios
      .get(url, this.getRequestOptions())
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error fetching Experiences with ID ${id}:`, error);
        throw error;
      });
  }

  createExperiences(experienceData) {
    return axios
      .post(this.baseUrl, experienceData, {
        headers: {
          ...this.getRequestOptions().headers,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error creating Experiences:", error);
        throw error;
      });
  }

  updateExperiences(id, updatedExperiences) {
    const url = `${this.baseUrl}/${id}`;
    return axios
      .put(url, updatedExperiences, this.getRequestOptions())
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error updating Experiences with ID ${id}:`, error);
        throw error;
      });
  }

  deleteExperiences(id) {
    const url = `${this.baseUrl}/${id}`;
    return axios
      .delete(url, this.getExperiences())
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error deleting Experiences with ID ${id}:`, error);
        throw error;
      });
  }

getCategories() {
    console.log("Fetching all Categories from:", this.categoriesUrl);
    
    return axios
      .get(this.categoriesUrl, this.getRequestOptions())
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching categories:", error);
        throw error;
      });
  }

  getCountries() {
    console.log("Fetching all Countries from:", this.countriesUrl);
    return axios
      .get(this.countriesUrl, this.getRequestOptions())
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching countries:", error);
        throw error;
      });
  }

}
