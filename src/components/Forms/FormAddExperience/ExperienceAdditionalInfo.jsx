import React from "react";

export default function ExperienceAdditionalInfo({ register, errors }) {
  return (
    <>
      {/* Descripción */}
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

      {/* Duración */}
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

      {/* Precio */}
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
    </>
  );
} 