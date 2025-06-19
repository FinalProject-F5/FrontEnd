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

      
    </>
  );
} 