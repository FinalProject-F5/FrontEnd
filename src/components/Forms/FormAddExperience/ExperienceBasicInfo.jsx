import React from "react";

export default function ExperienceBasicInfo({
  register,
  errors,
  countries,
  categories,
  loadingCountries,
  countriesError,
  loadingCategories,
  categoriesError,
}) {
  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>

       <div className="form-control w-full max-w-md mb-4 text-left">
        <label className="label">
          <span className="label-text font-semibold">
            Experience Name <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("title", { required: "Experience Name is required." })}
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
          {...register("location", { required: "Country is required." })}
        >
          <option value="" disabled>
            Select a country
          </option>
          {loadingCountries ? (
            <option>Loading countries...</option>
          ) : countriesError ? (
            <option className="text-error">{countriesError}</option>
          ) : (
            sortedCountries.map((country) => (
              <option key={country.code} value={country.name}>
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
          {...register("category", { required: "Category is required." })}
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
              <option key={category.id || category.name} value={category.name}>
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
    </>
  );
} 