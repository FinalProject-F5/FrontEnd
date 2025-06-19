import { useState, useEffect } from "react";
import { getCategories, getCountries, createExperiences } from "../service/apiService";

export function useAddExperienceForm(onSuccess) {
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [countriesError, setCountriesError] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoadingCountries(true);
    getCountries()
      .then(setCountries)
      .catch((err) => setCountriesError(err.message))
      .finally(() => setLoadingCountries(false));
    setLoadingCategories(true);
    getCategories()
      .then(setCategories)
      .catch((err) => setCategoriesError(err.message))
      .finally(() => setLoadingCategories(false));
  }, []);

  const handleSubmit = async (data, reset) => {
    try {
      const payload = {
        ...data,
        images: Array.isArray(data.images) ? data.images : []
      };
      await createExperiences(payload);
      setShowSuccessModal(true);
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      setErrorMessage(error.message || "Error adding experience");
      setShowErrorModal(true);
    }
  };

  return {
    countries, categories,
    loadingCountries, loadingCategories,
    countriesError, categoriesError,
    showSuccessModal, setShowSuccessModal,
    showErrorModal, setShowErrorModal,
    errorMessage, setErrorMessage,
    handleSubmit
  };
}
