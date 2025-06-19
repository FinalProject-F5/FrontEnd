import React from "react";

export default function ExperiencePlanningContact({ register, errors }) {
  return (
    <>
      <div className="form-control w-full max-w-md mb-4 text-left">
        <label className="label">
          <span className="label-text font-semibold">Itinerary</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-20 w-full"
          placeholder="Describe the itinerary (optional)"
          {...register("itinerary")}
        ></textarea>
      </div>

      <div className="form-control w-full max-w-md mb-4 text-left">
        <label className="label">
          <span className="label-text font-semibold">Observations</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-20 w-full"
          placeholder="Any special observations? (optional)"
          {...register("observation")}
        ></textarea>
      </div>

      <div className="form-control w-full max-w-md mb-4 text-left">
        <label className="label">
          <span className="label-text font-semibold">Host Name <span className="text-error">*</span></span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("host", { required: "Host name is required." })}
        />
        {errors.host && (
          <span className="text-error text-sm mt-1">{errors.host.message}</span>
        )}
      </div>

      <div className="form-control w-full max-w-md mb-4 text-left">
        <label className="label">
          <span className="label-text font-semibold">Email <span className="text-error">*</span></span>
        </label>
        <input
          type="email"
          className="input input-bordered w-full"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-error text-sm mt-1">{errors.email.message}</span>
        )}
      </div>

      <div className="form-control w-full max-w-md mb-4 text-left">
        <label className="label">
          <span className="label-text font-semibold">Mobile/WhatsApp <span className="text-error">*</span></span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("mobile", { required: "Mobile/WhatsApp is required." })}
        />
        {errors.mobile && (
          <span className="text-error text-sm mt-1">{errors.mobile.message}</span>
        )}
      </div>
    </>
  );
} 