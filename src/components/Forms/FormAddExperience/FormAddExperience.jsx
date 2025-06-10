import React, { useState } from "react";
import { Experiences } from "../../../service/apiService";

export default function FormAddExperience() {
  const categories = [
    "Art",
    "Authentic Gastronomy",
    "Music with Soul",
    "Routes with a Local Perspective",
    "Personal stories",
    "Local projects with impact",
    "Homestays and everyday life",
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    experienceName: "",
    location: "",
    category: "",
    // images: null, // Desactivado temporalmente
    description: "",
    duration: "",
    cost: "",
    itinerary: "",
    observations: "",
    hostName: "",
    hostEmail: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      // setFormData((prevData) => ({
      //   ...prevData,
      //   [name]: name === "images" ? files : files[0],
      // }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: sanitizeInput(value),
      }));
    }
  };

  const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
      return input;
    }
    return input.replace(/[<>"'/]/g, "");
  };

  const validateStep1 = () => {
    let newErrors = {};
    if (!formData.experienceName) newErrors.experienceName = "Experience Name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    // Validación de imágenes desactivada temporalmente
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors = {};
    if (!formData.description) newErrors.description = "Description is required.";
    if (formData.description.length < 200) newErrors.description = "Description must be at least 200 characters long.";
    if (!formData.duration) newErrors.duration = "Duration is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    let newErrors = {};
    if (!formData.hostName) newErrors.hostName = "Host Name is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (formData.hostEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.hostEmail)) {
      newErrors.hostEmail = "Invalid email format.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    } else if (currentStep === 3) {
      isValid = true;
    }
    if (isValid) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
      setErrors({});
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === totalSteps) {
      const isValid = validateStep4();
      if (isValid) {
        try {
          // Usar Experiences y axios para enviar los datos al backend
          const { /* images, */ ...dataToSend } = formData;
          const service = new Experiences();
          if (service.createExperiences) {
            await service.createExperiences(dataToSend);
            alert("Form submitted successfully!");
          } else {
            // Fallback a fetch si el método no existe
            await fetch("http://localhost:8080/api/v1/Experiences", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, // Si usas JWT
              },
              body: JSON.stringify(dataToSend),
            });
            alert("Form submitted successfully!");
          }
        } catch (err) {
          alert("Error submitting form");
        }
      } else {
        alert("Please correct the errors in the form.");
      }
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
            <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Experience Details</li>
            <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Additional Information</li>
            <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Planning & Scheduling</li>
            <li className={`step ${currentStep >= 4 ? 'step-primary' : ''}`}>Host Contact</li>
          </ul>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Paso 1 */}
            {currentStep === 1 && (
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-secondary mb-5 w-full text-center">
                  Experience Details
                </h3>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label ">
                    <span className="label-text font-semibold">
                      Experience Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="experienceName"
                    placeholder="e.g., Guided Hiking Tour in the Alps"
                    className="input input-bordered w-full"
                    value={formData.experienceName}
                    onChange={handleChange}
                  />
                  {errors.experienceName && <span className="text-error text-sm mt-1">{errors.experienceName}</span>}
                </div>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Location (Country) <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Kyoto, Japan"
                    className="input input-bordered w-full"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {errors.location && <span className="text-error text-sm mt-1">{errors.location}</span>}
                </div>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Category <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    name="category"
                    className="select select-bordered w-full"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && <span className="text-error text-sm mt-1">{errors.category}</span>}
                </div>
                {/* Desactivado temporalmente el input de imágenes */}
                {/* <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Add Images (minimum 3){" "}
                      <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="file"
                    name="images"
                    className="file-input file-input-bordered w-full"
                    multiple
                    onChange={handleChange}
                    accept=".png, .jpg, .jpeg"
                  />
                  {errors.images && <span className="text-error text-sm mt-1">{errors.images}</span>}
                </div> */}
              </div>
            )}

            {/* Paso 2 */}
            {currentStep === 2 && (
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-secondary mb-5 w-full text-center">
                  Additional Information
                </h3>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description <span className="text-error">*</span>
                    </span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your experience (min 200 characters)"
                    className="textarea textarea-bordered w-full"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
                </div>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Duration <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 3 hours"
                    className="input input-bordered w-full"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  {errors.duration && <span className="text-error text-sm mt-1">{errors.duration}</span>}
                </div>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Cost
                    </span>
                  </label>
                  <input
                    type="text"
                    name="cost"
                    placeholder="e.g., 50€"
                    className="input input-bordered w-full"
                    value={formData.cost}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Paso 3 */}
            {currentStep === 3 && (
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-secondary mb-5 w-full text-center">
                  Planning & Scheduling
                </h3>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Itinerary
                    </span>
                  </label>
                  <textarea
                    name="itinerary"
                    placeholder="Describe the itinerary"
                    className="textarea textarea-bordered w-full"
                    value={formData.itinerary}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Observations
                    </span>
                  </label>
                  <textarea
                    name="observations"
                    placeholder="Any additional observations"
                    className="textarea textarea-bordered w-full"
                    value={formData.observations}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Paso 4 */}
            {currentStep === 4 && (
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-secondary mb-5 w-full text-center">
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
                    name="hostName"
                    placeholder="Host Name"
                    className="input input-bordered w-full"
                    value={formData.hostName}
                    onChange={handleChange}
                  />
                  {errors.hostName && <span className="text-error text-sm mt-1">{errors.hostName}</span>}
                </div>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Host Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="hostEmail"
                    placeholder="Host Email"
                    className="input input-bordered w-full"
                    value={formData.hostEmail}
                    onChange={handleChange}
                  />
                  {errors.hostEmail && <span className="text-error text-sm mt-1">{errors.hostEmail}</span>}
                </div>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Phone <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="input input-bordered w-full"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="text-error text-sm mt-1">{errors.phone}</span>}
                </div>
              </div>
            )}

            {/* Botones de navegación */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mt-6 mx-auto">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn btn-secondary w-full sm:w-auto flex-grow"
                >
                  Previous
                </button>
              )}
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={handleNext}
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
    </div>
  );
}