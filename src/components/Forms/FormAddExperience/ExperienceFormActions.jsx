import React from "react";

export default function ExperienceFormActions({ isSubmitting }) {
  return (
    <div className="flex justify-center w-full max-w-md mt-6 mx-auto">
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Experience"}
      </button>
    </div>
  );
} 