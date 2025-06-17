
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Experiences } from "../../../service/apiService";
import { useNavigate } from "react-router-dom";

const experiencesService = new Experiences();

export default function FormAddExperience() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countriesError, setCountriesError] = useState(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      location: "",
      category: "",
      description: "",
      duration: "",
      price: "",
      host: "",
      email: "",
      mobile: "",
      addInfo: "",
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError(null);
        const categoriesData = await experiencesService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoriesError("Failed to load categories. Please try again later.");
      } finally {
        setLoadingCategories(false);
      }

      try {
        setLoadingCountries(true);
        setCountriesError(null);
        const countriesData = await experiencesService.getCountries();
        
        const sortedCountries = [...countriesData].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setCountries(sortedCountries);

      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountriesError("Failed to load countries. Please try again later.");
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchInitialData();
  }, []); 

  const validateStep1 = (data) => {
    let valid = true;
    clearErrors();
    if (!data.title) {
      setError("title", { type: "manual", message: "Experience Name is required." });
      valid = false;
    } else if (data.title.length > 100) {
      setError("title", { type: "manual", message: "Title must be at most 100 characters." });
      valid = false;
    }
    if (!data.location) {
      setError("location", { type: "manual", message: "Country is required." });
      valid = false;
    }
    if (!data.category) {
      setError("category", { type: "manual", message: "Category is required." });
      valid = false;
    }
    const files = data.images;
    if (!files || files.length < 3) {
      setError("images", { type: "manual", message: "At least 3 images are required." });
      valid = false;
    } else {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type !== "image/png" && files[i].type !== "image/jpeg") {
          setError("images", { type: "manual", message: "Only PNG or JPG image formats are allowed." });
          valid = false;
          break;
        }
      }
    }
    return valid;
  };

  const validateStep2 = (data) => {
    let valid = true;
    clearErrors();
    if (!data.description) {
      setError("description", { type: "manual", message: "Description is required." });
      valid = false;
    } else if (data.description.length < 100) {
      setError("description", { type: "manual", message: "Description must be at least 100 characters long." });
      valid = false;
    }
    if (!data.duration) {
      setError("duration", { type: "manual", message: "Duration is required." });
      valid = false;
    }
    if (!data.price && data.price !== 0) { 
      setError("price", { type: "manual", message: "Price is required." });
      valid = false;
    } else if (Number(data.price) < 0) {
      setError("price", { type: "manual", message: "Price must be 0 or greater." });
      valid = false;
    }
    return valid;
  };
  

  const validateStep4 = (data) => {
    let valid = true;
    clearErrors();
    if (!data.host) {
      setError("host", { type: "manual", message: "Host Name is required." });
      valid = false;
    } else if (data.host.length > 100) {
      setError("host", { type: "manual", message: "Host name must be at most 100 characters." });
      valid = false;
    }
    if (!data.mobile) {
      setError("mobile", { type: "manual", message: "Phone is required." });
      valid = false;
    } else if (data.mobile.length > 20) {
      setError("mobile", { type: "manual", message: "Phone must be at most 20 characters." });
      valid = false;
    }
   
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("email", { type: "manual", message: "Invalid email format." });
      valid = false;
    } else if (data.email && data.email.length > 100) {
      setError("email", { type: "manual", message: "Email must be at most 100 characters." });
      valid = false;
    }
    return valid;
  };

  const onNext = (data) => {
    let isValid = false;

    if (currentStep === 1) isValid = validateStep1(data);
    else if (currentStep === 2) isValid = validateStep2(data);
    else if (currentStep === 3) isValid = true; 
   
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const onPrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data) => {
    if (!validateStep4(data)) {
       
        setCurrentStep(4);
        return;
    }

    const payload = {
      ...data,
      price: data.price === "" ? 0 : Number(data.price),  
      addInfo: data.addInfo || "", 
     
      itinerary: data.itinerary || "",
      observations: data.observations || ""
    };

    try {
      const filesTemp = data.images;
      payload.images = [];

      for (const file of filesTemp) {
        const base64 = await convertFileToBase64(file);
        const imageObject = {
          base64: base64,
          name: file.name,
          type: file.type,
          size: file.size
        };
        payload.images.push(imageObject);
      }

      await experiencesService.createExperiences(payload);
      setShowSuccessModal(true);
      reset();
      setCurrentStep(1);
    } catch (error) {
      console.error("Error creating experience:", error);  
      if (error.response && error.response.status === 400 && error.response.data.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("Error: Could not create experience. Please try again.");
      }
    }
  };

  const images = watch("images");  

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };


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
            Add a New Experience
          </h2>

          <ul className="steps steps-vertical lg:steps-horizontal w-full mb-8 font-semibold">
            <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
              Experience Details
            </li>
            <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
              Additional Information
            </li>
            <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
              Planning & Scheduling
            </li>
            <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>
              Host Contact
            </li>
          </ul>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {currentStep === 1 && (
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
                    {...register("title")}
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
                    {...register("location")}
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
                    {...register("category")}
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

                <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Add Images (minimum 3) <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    multiple
                    accept=".png, .jpg, .jpeg"
                    {...register("images")}
                  />
                  {errors.images && (
                    <span className="text-error text-sm mt-1">
                      {errors.images.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col items-center">
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
                    {...register("description")}
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
                    {...register("duration")}
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
                      Price EUR
                    </span>
                  </label>
                  <input
                    type="number"  
                    placeholder="e.g., 150"
                    className="input input-bordered w-full"
                    {...register("price", { valueAsNumber: true })}  
                  />
                 
                  {errors.price && (
                    <span className="text-error text-sm mt-1">
                      {errors.price.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center">
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
                    {...register("observations")}
                  ></textarea>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex flex-col items-center">
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
                    {...register("host")}
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
                    {...register("email")}
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
                    {...register("mobile")}
                  />
                  {errors.mobile && (
                    <span className="text-error text-sm mt-1">
                      {errors.mobile.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mt-6 mx-auto">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => onPrevious()}
                  className="btn btn-secondary w-full sm:w-auto flex-grow"
                >
                  Previous
                </button>
              )}
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={handleSubmit(onNext)}
                  className="btn btn-primary w-full sm:w-auto flex-grow"
                >
                  Next
                </button>
              )}
              {currentStep === totalSteps && (
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto flex-grow"
                >
                  Create Experience
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <dialog id="success_modal" className={`modal ${showSuccessModal ? 'modal-open' : ''}`}>
        <div className="modal-box bg-warning text-black text-center p-8 rounded-lg shadow-lg">
          <h3 className="font-bold text-2xl">Experience Created Successfully!</h3>
          <p className="py-4 text-lg">Your experience has been created successfully.</p>
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
    </div>
  );
}
