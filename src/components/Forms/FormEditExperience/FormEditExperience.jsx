import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Experiences } from "../../../service/apiService";

const experiencesService = new Experiences();

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default function FormEditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countriesError, setCountriesError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      location: "",
      category: "",
      description: "",
      duration: "",
      price: "",
      itinerary: "",
      observation: "",
      host: "",
      email: "",
      mobile: "",
      addInfo: "",
    },
  });

  useEffect(() => {
    const fetchExperienceAndAuxData = async () => {
      const user = getCurrentUser();
      console.log("Logged-in user:", user);

      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const experienceData = await experiencesService.getExperiencesById(id);
        console.log("Experience data received from API:", experienceData);

        console.log("Experience Creator ID (API):", experienceData.userId);
        console.log("Logged-in User ID (localStorage):", user.id);

        if (!experienceData.userId || !user.id || experienceData.userId !== user.id) {
          setUnauthorized(true);
          setLoading(false);
          return;
        }

        setValue("title", experienceData.title || "");
        setValue("location", experienceData.location || "");
        setValue("category", experienceData.category || "");
        setValue("description", experienceData.description || "");
        setValue("duration", experienceData.duration || "");
        setValue("price", experienceData.price || 0);
        setValue("itinerary", experienceData.itinerary || "");
        setValue("observation", experienceData.observation || "");
        setValue("host", experienceData.host || "");
        setValue("email", experienceData.email || "");
        setValue("mobile", experienceData.mobile || "");
        setValue("addInfo", experienceData.addInfo || "");

        setLoadingCategories(true);
        setCategoriesError(null);
        try {
          const fetchedCategories = await experiencesService.getCategories();
          setCategories(fetchedCategories);
        } catch (error) {
          console.error("Error fetching categories:", error);
          setCategoriesError("Failed to load categories. Please try again.");
        } finally {
          setLoadingCategories(false);
        }

        setLoadingCountries(true);
        setCountriesError(null);
        try {
          const fetchedCountries = await experiencesService.getCountries();
          const sortedCountries = [...fetchedCountries].sort((a, b) => a.name.localeCompare(b.name));
          setCountries(sortedCountries);
        } catch (error) {
          console.error("Error fetching countries:", error);
          setCountriesError("Failed to load countries. Please try again.");
        } finally {
          setLoadingCountries(false);
        }

      } catch (err) {
        console.error("Error loading experience or auxiliary data:", err);
        setLoading(false);

        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            setUnauthorized(true);
          } else if (err.response.data && err.response.data.message) {
            setErrorMessage(err.response.data.message);
          } else {
            setErrorMessage("Failed to load experience details. Please try again.");
          }
        } else {
          setErrorMessage("Network error or server unreachable. Please check your connection.");
        }
        setShowErrorModal(true);
      } finally {
        if (loading) setLoading(false);
      }
    };

    fetchExperienceAndAuxData();
  }, [id, navigate, setValue, loading]);

  const onSubmit = async (formData) => {
    try {
      if (!formData.title || !formData.location || !formData.category || !formData.description || !formData.duration || formData.price === null || formData.price === undefined || formData.price < 0 || !formData.host || !formData.mobile) {
        setErrorMessage("Please fill in all required fields correctly.");
        setShowErrorModal(true);
        return;
      }
      if (formData.description.length < 100) {
        setErrorMessage("Description must be at least 100 characters long.");
        setShowErrorModal(true);
        return;
      }
      if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
        setErrorMessage("Invalid email format.");
        setShowErrorModal(true);
        return;
      }
      
      const payload = {
        ...formData,
        price: Number(formData.price),
        itinerary: formData.itinerary || "",
        observation: formData.observation || "",
        addInfo: formData.addInfo || "",
        images: undefined
      };

      await experiencesService.updateExperiences(id, payload);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating experience:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage("Error: " + error.response.data.message);
      } else {
        setErrorMessage("Failed to update experience. Please try again.");
      }
      setShowErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-4 text-primary text-lg">Loading experience data...</p>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="alert alert-error shadow-lg max-w-md">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>You are not authorized to edit this experience.</span>
          </div>
          <button className="btn btn-sm btn-error" onClick={() => navigate('/')}>Go to Homepage</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 [filter:sepia(20%)]"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-8 rounded-lg">
        <div className="card-body items-center text-center p-0">
          <h2 className="card-title text-4xl font-bold text-primary mb-8">
            Edit Experience
          </h2>

          <ul className="steps steps-vertical lg:steps-horizontal w-full mb-8 font-semibold">
            <li className="step step-primary">Experience Details</li>
            <li className="step step-primary">Additional Information</li>
            <li className="step step-primary">Planning & Scheduling</li>
            <li className="step step-primary">Host Contact</li>
          </ul>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-bold text-secondary mb-5 w-full text-center">
                Experience Details
              </h3>
              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Experience Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Guided Hiking Tour in the Alps"
                  className="input input-bordered w-full"
                  {...register("title", {
                    required: "Experience Name is required.",
                    maxLength: { value: 100, message: "Title must be at most 100 characters." }
                  })}
                />
                {errors.title && (
                  <span className="text-error text-sm mt-1">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Country <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("location", { required: "Country is required." })}
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {loadingCountries ? (
                    <option>Loading countries...</option>
                  ) : countriesError ? (
                    <option className="text-error">{countriesError}</option>
                  ) : (
                    countries.map((country) => (
                      <option
                        key={country.code}
                        value={country.name}
                      >
                        {country.name}
                      </option>
                    ))
                  )}
                </select>
                {errors.location && (
                  <span className="text-error text-sm mt-1">
                    {errors.location.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Category <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register("category", { required: "Category is required." })}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {loadingCategories ? (
                    <option>Loading categories...</option>
                  ) : categoriesError ? (
                    <option className="text-error">{categoriesError}</option>
                  ) : (
                    categories.map((category) => (
                      <option
                        key={category.id || category.name}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
                {errors.category && (
                  <span className="text-error text-sm mt-1">
                    {errors.category.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center mt-8">
              <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">
                Additional Information
              </h3>
              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Description of the Experience (min. 100 characters) <span className="text-error">*</span>
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Provide a detailed description of the experience..."
                  {...register("description", {
                    required: "Description is required.",
                    minLength: { value: 100, message: "Description must be at least 100 characters long." }
                  })}
                ></textarea>
                {errors.description && (
                  <span className="text-error text-sm mt-1">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Duration in Hours<span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., 3"
                  className="input input-bordered w-full"
                  {...register("duration", { required: "Duration is required." })}
                />
                {errors.duration && (
                  <span className="text-error text-sm mt-1">
                    {errors.duration.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-md mb-6 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Price EUR <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 150"
                  className="input input-bordered w-full"
                  {...register("price", {
                    valueAsNumber: true,
                    required: "Price is required.",
                    min: { value: 0, message: "Price must be 0 or greater." }
                  })}
                />
                {errors.price && (
                  <span className="text-error text-sm mt-1">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center mt-8">
              <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">
                Planning & Scheduling
              </h3>
              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Itinerary (optional)
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Outline the daily itinerary, if applicable."
                  {...register("itinerary")}
                ></textarea>
              </div>

              <div className="form-control w-full max-w-md mb-6 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Observations (optional)
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Any additional notes or observations."
                  {...register("observation")}
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col items-center mt-8">
              <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">
                Host Contact
              </h3>
              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Host Name <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Angelina Jolie"
                  className="input input-bordered w-full"
                  {...register("host", {
                    required: "Host Name is required.",
                    maxLength: { value: 100, message: "Host name must be at most 100 characters." }
                  })}
                />
                {errors.host && (
                  <span className="text-error text-sm mt-1">
                    {errors.host.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Host Email (optional)
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="e.g., host@example.com"
                  className="input input-bordered w-full"
                  {...register("email", {
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format." },
                    maxLength: { value: 100, message: "Email must be at most 100 characters." }
                  })}
                />
                {errors.email && (
                  <span className="text-error text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-md mb-4 text-left">
                <label className="label">
                  <span className="label-text font-semibold">
                    Phone <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g., +34 123 456 7890"
                  className="input input-bordered w-full"
                  {...register("mobile", {
                    required: "Phone is required.",
                    maxLength: { value: 20, message: "Phone must be at most 20 characters." }
                  })}
                />
                {errors.mobile && (
                  <span className="text-error text-sm mt-1">
                    {errors.mobile.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-center w-full max-w-md mt-6 mx-auto">
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Update Experience
              </button>
            </div>
          </form>
        </div>
      </div>

      <dialog id="success_modal" className={`modal ${showSuccessModal ? 'modal-open' : ''}`}>
        <div className="modal-box bg-warning text-black text-center p-8 rounded-lg shadow-lg">
          <h3 className="font-bold text-2xl">Experience Updated Successfully!</h3>
          <p className="py-4 text-lg">Your experience has been updated successfully.</p>
          <div className="modal-action">
            <button
              className="btn btn-success text-white px-6 py-2 rounded-lg"
              onClick={handleCloseSuccessModal}
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="error_modal" className={`modal ${showErrorModal ? 'modal-open' : ''}`}>
        <div className="modal-box bg-error text-white text-center p-8 rounded-lg shadow-lg">
          <h3 className="font-bold text-2xl">Error!</h3>
          <p className="py-4 text-lg">{errorMessage}</p>
          <div className="modal-action">
            <button
              className="btn btn-neutral text-white px-6 py-2 rounded-lg"
              onClick={handleCloseErrorModal}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}