import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createExperiences, getCategories, getCountries } from "../../../service/apiService";
import { useNavigate } from "react-router-dom";
import ExperienceBasicInfo from "./ExperienceBasicInfo";
import ExperienceAdditionalInfo from "./ExperienceAdditionalInfo";
import ExperiencePlanningContact from "./ExperiencePlanningContact";
import ExperienceFormActions from "./ExperienceFormActions";
import ExperienceSuccessModal from "./ExperienceSuccessModal";
import ExperienceErrorModal from "./ExperienceErrorModal";
import { useAddExperienceForm } from "../../../hooks/useAddExperienceForm";

export default function FormAddExperience() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {
    countries, categories,
    loadingCountries, loadingCategories,
    countriesError, categoriesError,
    showSuccessModal, setShowSuccessModal,
    showErrorModal, setShowErrorModal,
    errorMessage, setErrorMessage,
    handleSubmit: onSubmit
  } = useAddExperienceForm();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const validateStep1 = (data) => {
    let valid = true;
    if (!data.title) {
      errors.title = { type: "manual", message: "Experience Name is required." };
      valid = false;
    } else if (data.title.length > 100) {
      errors.title = { type: "manual", message: "Title must be at most 100 characters." };
      valid = false;
    }
    if (!data.location) {
      errors.location = { type: "manual", message: "Country is required." };
      valid = false;
    }
    if (!data.category) {
      errors.category = { type: "manual", message: "Category is required." };
      valid = false;
    }
    const files = data.images;
    if (!files || files.length < 3) {
      errors.images = { type: "manual", message: "At least 3 images are required." };
      valid = false;
    } else {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type !== "image/png" && files[i].type !== "image/jpeg") {
          errors.images = { type: "manual", message: "Only PNG or JPG image formats are allowed." };
          valid = false;
          break;
        }
      }
    }
    return valid;
  };

  const validateStep2 = (data) => {
    let valid = true;
    if (!data.description) {
      errors.description = { type: "manual", message: "Description is required." };
      valid = false;
    } else if (data.description.length < 100) {
      errors.description = { type: "manual", message: "Description must be at least 100 characters long." };
      valid = false;
    }
    if (!data.duration) {
      errors.duration = { type: "manual", message: "Duration is required." };
      valid = false;
    }
    if (!data.price && data.price !== 0) { 
      errors.price = { type: "manual", message: "Price is required." };
      valid = false;
    } else if (Number(data.price) < 0) {
      errors.price = { type: "manual", message: "Price must be 0 or greater." };
      valid = false;
    }
    return valid;
  };
  

  const validateStep4 = (data) => {
    let valid = true;
    if (!data.host) {
      errors.host = { type: "manual", message: "Host Name is required." };
      valid = false;
    } else if (data.host.length > 100) {
      errors.host = { type: "manual", message: "Host name must be at most 100 characters." };
      valid = false;
    }
    if (!data.mobile) {
      errors.mobile = { type: "manual", message: "Phone is required." };
      valid = false;
    } else if (data.mobile.length > 20) {
      errors.mobile = { type: "manual", message: "Phone must be at most 20 characters." };
      valid = false;
    }
   
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = { type: "manual", message: "Invalid email format." };
      valid = false;
    } else if (data.email && data.email.length > 100) {
      errors.email = { type: "manual", message: "Email must be at most 100 characters." };
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

  const images = register("images");  

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

          <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="w-full">
            {currentStep === 1 && (
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-secondary mb-5 w-full text-center">
                  Experience Details
                </h3>
                <ExperienceBasicInfo
                  register={register}
                  errors={errors}
                  countries={countries}
                  categories={categories}
                  loadingCountries={loadingCountries}
                  countriesError={countriesError}
                  loadingCategories={loadingCategories}
                  categoriesError={categoriesError}
                />

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
                <ExperienceAdditionalInfo register={register} errors={errors} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">
                  Planning & Scheduling
                </h3>
                <ExperiencePlanningContact register={register} errors={errors} />
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

            <ExperienceFormActions isSubmitting={false} />
          </form>
        </div>
      </div>

      <ExperienceSuccessModal show={showSuccessModal} onClose={handleCloseSuccessModal} />
      <ExperienceErrorModal show={showErrorModal} errorMessage={errorMessage} onClose={() => setShowErrorModal(false)} />
    </div>
  );
}
