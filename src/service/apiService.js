import axios from "axios";

export class Experiences {
  baseUrl = "http://localhost:8080/api/v1/Experiences";

  getRequestOptions() {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      headers: {
        Experiences: "experiences/json",
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
          "Content-Type": "multipart/form-data",
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
}
