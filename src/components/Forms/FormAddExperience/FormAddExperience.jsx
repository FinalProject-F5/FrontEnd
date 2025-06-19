import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createExperiences } from "../../../service/apiService";
import { useNavigate } from "react-router-dom";
import ExperienceBasicInfo from "./ExperienceBasicInfo";
import ExperienceAdditionalInfo from "./ExperienceAdditionalInfo";
import ExperiencePlanningContact from "./ExperiencePlanningContact";
import ExperienceSuccessModal from "./ExperienceSuccessModal";
import ExperienceErrorModal from "./ExperienceErrorModal";
import { useAddExperienceForm } from "../../../hooks/useAddExperienceForm";

export default function FormAddExperience() {
  const navigate = useNavigate();

  // Renombrar para evitar conflicto
  const { register, handleSubmit: formHandleSubmit, formState: { errors }, reset } = useForm();
  const {
    countries, categories,
    loadingCountries, loadingCategories,
    countriesError, categoriesError,
    showSuccessModal, setShowSuccessModal,
    showErrorModal, setShowErrorModal,
    errorMessage, setErrorMessage
  } = useAddExperienceForm();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Validaciones por paso
  const validateStep1 = (data) => {
    let valid = true;
    if (!data.title) valid = false;
    if (!data.location) valid = false;
    if (!data.category) valid = false;
    const files = data.images;
    if (!files || files.length < 3) valid = false;
    else {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type !== "image/png" && files[i].type !== "image/jpeg") {
          valid = false;
          break;
        }
      }
    }
    return valid;
  };

  const validateStep2 = (data) => {
    let valid = true;
    if (!data.description || data.description.length < 100) valid = false;
    if (!data.duration) valid = false;
    if (data.price === undefined || data.price === null || Number(data.price) < 0) valid = false;
    return valid;
  };

  const validateStep3 = (data) => {
    let valid = true;
    if (!data.host) valid = false;
    if (!data.mobile) valid = false;
    if (!data.email) valid = false;
    return valid;
  };

  const onNext = (data) => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1(data);
    else if (currentStep === 2) isValid = validateStep2(data);
    else if (currentStep === 3) isValid = validateStep3(data);
    else isValid = true;
    if (isValid) setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const onPrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  // Submit final
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        images: Array.isArray(data.images) ? data.images : []
      };
      await createExperiences(payload);
      setShowSuccessModal(true);
      reset();
    } catch (error) {
      setErrorMessage(error.message || "Error adding experience");
      setShowErrorModal(true);
    }
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
            <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Experience Details</li>
            <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Additional Information</li>
            <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>Planning & Scheduling</li>
            <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>Confirmation</li>
          </ul>

          <form onSubmit={formHandleSubmit(currentStep === totalSteps ? onSubmit : onNext)} className="w-full">
            {currentStep === 1 && (
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-secondary mb-5 w-full text-center">Experience Details</h3>
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
                    <span className="text-error text-sm mt-1">{errors.images.message}</span>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">Additional Information</h3>
                <ExperienceAdditionalInfo register={register} errors={errors} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">Planning & Scheduling</h3>
                <ExperiencePlanningContact register={register} errors={errors} />
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">Confirmation</h3>
                <p className="mb-4">Review your information and click <b>Add Experience</b> to submit.</p>
                {/* Aquí podrías mostrar un resumen de los datos si lo deseas */}
              </div>
            )}

            <div className="flex gap-4 mt-6">
              {currentStep > 1 && (
                <button type="button" onClick={onPrevious} className="btn btn-secondary">
                  Back
                </button>
              )}
              {currentStep < totalSteps ? (
                <button type="button" onClick={formHandleSubmit(onNext)} className="btn btn-primary">
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Add Experience
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <ExperienceSuccessModal show={showSuccessModal} onClose={handleCloseSuccessModal} />
      <ExperienceErrorModal show={showErrorModal} errorMessage={errorMessage} onClose={() => setShowErrorModal(false)} />
    </div>
  );
}
