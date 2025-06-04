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

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert("Form submitted!");
   
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
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
            {/* Step 1: Experience Details */}
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
                    placeholder="e.g., Guided Hiking Tour in the Alps"
                    className="input input-bordered w-full"
                    required
                  />
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
                    placeholder="e.g., Kyoto, Japan"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">
                      Category <span className="text-error">*</span>
                    </span>
                  </label>
                  <select className="select select-bordered w-full" required>
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
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
                    className="file-input file-input-bordered w-full"
                    multiple
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Additional Information */}
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
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Provide a detailed description of the experience..."
                    minLength="200"
                    required
                  ></textarea>
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">
                      Duration <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 3 hours, Full-day, 2 nights"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text">Estimated Cost (optional)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 150"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Planning & Scheduling */}
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
                    className="textarea textarea-bordered h-24 w-full "
                    placeholder="Outline the daily itinerary, if applicable."
                  ></textarea>
                </div>

                <div className="form-control w-full max-w-md mb-6 text-left">
                  <label className="label">
                    <span className="label-text">Observations (optional)</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Any additional notes or observations."
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 4: Host Contact */}
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
                    placeholder="e.g., Jane Doe"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">Host Email (optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g., host@example.com"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">
                      Phone <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g., +1 123 456 7890"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">Social Media (optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Instagram, Facebook profile link"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control w-full max-w-md mb-4 text-left">
                  <label className="label">
                    <span className="label-text">Address (optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 123 Main St, Anytown"
                    className="input input-bordered w-full"
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
                    className="file-input file-input-bordered w-full"
                    required
                  />
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