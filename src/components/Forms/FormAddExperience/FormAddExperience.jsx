import React, { useState } from "react";

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
    images: null, 
    description: "",
    duration: "",
    cost: "",
    itinerary: "",
    observations: "",
    hostName: "",
    hostEmail: "",
    phone: "",
    socialMedia: "",
    address: "",
    hostPhoto: null,  
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "images" ? files : files[0],  
      }));
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
    
    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "At least 3 images are required.";
    } else if (formData.images.length < 3) {
      newErrors.images = "At least 3 images are required.";
    } else {
      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i];
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
          newErrors.images = "Only PNG or JPG image formats are allowed.";
          break;
        }
      }
    }
    
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
    
    if (!formData.hostPhoto) {
      newErrors.hostPhoto = "Host Profile Photo is required.";
    } else if (formData.hostPhoto.type !== "image/png" && formData.hostPhoto.type !== "image/jpeg") {
      newErrors.hostPhoto = "Only PNG or JPG image formats are allowed.";
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === totalSteps) {
      const isValid = validateStep4();
      if (isValid) {
        console.log("Form Data:", formData);
        alert("Form submitted successfully!");
      } else {
        alert("Please correct the errors in the form.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 [filter:sepia(40%)]"
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

          <ul className="steps steps-vertical lg:steps-horizontal w-full mb-8">
            <li className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Experience Details</li>
            <li className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Additional Information</li>
            <li className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Planning & Scheduling</li>
            <li className={`step ${currentStep >= 4 ? 'step-primary' : ''}`}>Host Contact</li>
          </ul>

          <form onSubmit={handleSubmit} className="w-full">
            {currentStep === 1 && (
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-secondary mb-5 w-full text-center">
                  Experience Details
                </h3>
                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">
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
                    <span className="label-text">
                      Location (City, Country){" "}
                      <span className="text-error">*</span>
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
                    <span className="label-text">
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

                <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text">
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
                    <span className="label-text">
                      Description of the Experience (min. 200 characters){" "}
                      <span className="text-error">*</span>
                    </span>
                  </label>
                  <textarea
                    name="description"
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Provide a detailed description of the experience..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && <span className="text-error text-sm mt-1">{errors.description}</span>}
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">
                      Duration <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 3 hours, Full-day, 2 nights"
                    className="input input-bordered w-full"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                  {errors.duration && <span className="text-error text-sm mt-1">{errors.duration}</span>}
                </div>

                <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text">Estimated Cost (optional)</span>
                  </label>
                  <input
                    type="number"
                    name="cost"
                    placeholder="e.g., 150"
                    className="input input-bordered w-full"
                    value={formData.cost}
                    onChange={handleChange}
                  />
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
                    <span className="label-text">Itinerary (optional)</span>
                  </label>
                  <textarea
                    name="itinerary"
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Outline the daily itinerary, if applicable."
                    value={formData.itinerary}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text">Observations (optional)</span>
                  </label>
                  <textarea
                    name="observations"
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Any additional notes or observations."
                    value={formData.observations}
                    onChange={handleChange}
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
                    <span className="label-text">
                      Host Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="hostName"
                    placeholder="e.g., Jane Doe"
                    className="input input-bordered w-full"
                    value={formData.hostName}
                    onChange={handleChange}
                  />
                  {errors.hostName && <span className="text-error text-sm mt-1">{errors.hostName}</span>}
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">Host Email (optional)</span>
                  </label>
                  <input
                    type="email"
                    name="hostEmail"
                    placeholder="e.g., host@example.com"
                    className="input input-bordered w-full"
                    value={formData.hostEmail}
                    onChange={handleChange}
                  />
                  {errors.hostEmail && <span className="text-error text-sm mt-1">{errors.hostEmail}</span>}
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">
                      Phone <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g., +34 123 456 7890"
                    className="input input-bordered w-full"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="text-error text-sm mt-1">{errors.phone}</span>}
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">Social Media (optional)</span>
                  </label>
                  <input
                    type="text"
                    name="socialMedia"
                    placeholder="e.g., Instagram, Facebook profile link"
                    className="input input-bordered w-full"
                    value={formData.socialMedia}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">Address (optional)</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g., 742 Evergreen Terrace"
                    className="input input-bordered w-full"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text">
                      Host Profile Photo <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="file"
                    name="hostPhoto"
                    className="file-input file-input-bordered w-full"
                    onChange={handleChange}
                    accept=".png, .jpg, .jpeg"
                  />
                  {errors.hostPhoto && <span className="text-error text-sm mt-1">{errors.hostPhoto}</span>}
                </div>
              </div>
            )}
             
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