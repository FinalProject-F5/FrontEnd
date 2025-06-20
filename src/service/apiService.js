import axios from "axios";

const baseUrl = "http://localhost:8080/api/experiences";
const categoriesUrl = "http://localhost:8080/api/categories/all";
const countriesUrl = "http://localhost:8080/api/countries/all";

function getRequestOptions() {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: {
      ...(user && user.token ? { Authorization: `Bearer ${user.token}` } : {}),
      ...(user && user.id ? { "X-User-ID": user.id } : {}),
    },
  };
}

export function getAllExperiences() {
  
  return axios
    .get(baseUrl, getRequestOptions())
    .then((response) => response.data)
    .catch((error) => {
      // console.error("Error fetching Experiences:", error);
      throw error;
    });
}

export function searchExperiences(searchTerm) {
  return axios
    .get(`${baseUrl}/search`, {
      ...getRequestOptions(),
      params: { title: searchTerm.trim() },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error searching Experiences:", error);
      throw error;
    });
}

export function getExperiencesById(id) {
  const url = `${baseUrl}/${id}`;
  return axios
    .get(url, getRequestOptions())
    .then((response) => response.data)
    .catch((error) => {
      // console.error(`Error fetching Experiences with ID ${id}:`, error);
      throw error;
    });
}

export function createExperiences(experienceData) {
  const isFormData = experienceData instanceof FormData;
  return axios
    .post(baseUrl, experienceData, {
      headers: {
        ...getRequestOptions().headers,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      // console.error("Error creating Experiences:", error);
      throw error;
    });
}

export function updateExperiences(id, updatedExperiences) {
  const url = `${baseUrl}/${id}`;
  return axios
    .put(url, updatedExperiences, getRequestOptions())
    .then((response) => response.data)
    .catch((error) => {
      // console.error(`Error updating Experiences with ID ${id}:`, error);
      throw error;
    });
}

export function deleteExperiences(id) {
  const url = `${baseUrl}/${id}`;
  return axios
    .delete(url, getRequestOptions())
    .then((response) => {
      if (response.status === 204) {
        
        return true;
      } else {
        throw new Error(`Respuesta inesperada: ${response.status}`);
      }
    })
    .catch((error) => {
      // console.error(`Error deleting Experiences with ID ${id}:`, error);
      throw error;
    });
}

export function getCategories() {
  return axios
    .get(categoriesUrl, getRequestOptions())
    .then((response) => response.data)
    .catch((error) => {
      // console.error("Error fetching categories:", error);
      throw error;
    });
}

export function getCountries() {
  return axios
    .get(countriesUrl, getRequestOptions())
    .then((response) => response.data)
    .catch((error) => {
      // console.error("Error fetching countries:", error);
      throw error;
    });
}
