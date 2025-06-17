import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Experiences } from "../../../service/apiService";

const experiencesService = new Experiences();

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default function FormEditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchExperience = async () => {
      const user = getCurrentUser();
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const data = await experiencesService.getExperiencesById(id);

        
        if (data.email !== user.email) {
          setUnauthorized(true);
          return;
        }

        
        Object.keys(data).forEach((key) => {
          if (key !== "images") {
            setValue(key, data[key]);
          }
        });
      } catch (err) {
        console.error("Error fetching experience:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id, navigate, setValue]);

  const onSubmit = async (formData) => {
    try {
      await experiencesService.updateExperiences(id, formData);
      alert("Experience updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update experience.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  ;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Edit Experience</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="font-semibold">Title</label>
          <input
            className="input input-bordered w-full"
            {...register("title", { required: true })}
          />
          {errors.title && <span className="text-error text-sm">Title is required</span>}
        </div>

        
        <div>
          <label className="font-semibold">Country</label>
          <select
            className="select select-bordered w-full"
            {...register("location", { required: true })}
          >
            <option value="">Select country</option>
            
          </select>
          {errors.location && <span className="text-error text-sm">Country is required</span>}
        </div>

        
        <div>
          <label className="font-semibold">Category</label>
          <select
            className="select select-bordered w-full"
            {...register("category", { required: true })}
          >
            <option value="">Select category</option>
            
          </select>
          {errors.category && <span className="text-error text-sm">Category is required</span>}
        </div>

       
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          />
          {errors.description && <span className="text-error text-sm">Description is required</span>}
        </div>

        <div>
          <label className="font-semibold">Duration (hours)</label>
          <input
            className="input input-bordered w-full"
            {...register("duration", { required: true })}
          />
          {errors.duration && <span className="text-error text-sm">Duration is required</span>}
        </div>

        
        <div>
          <label className="font-semibold">Price (EUR)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("price")}
          />
        </div>

        
        <div>
          <label className="font-semibold">Itinerary (optional)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("itinerary")}
          />
        </div>

       
        <div>
          <label className="font-semibold">Observations (optional)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("observation")}
          />
        </div>

        
        <div>
          <label className="font-semibold">Host Name</label>
          <input
            className="input input-bordered w-full"
            {...register("host", { required: true })}
          />
          {errors.host && <span className="text-error text-sm">Host is required</span>}
        </div>

        
        <div>
          <label className="font-semibold">Email (optional)</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email")}
          />
        </div>

       
        <div>
          <label className="font-semibold">Mobile</label>
          <input
            type="tel"
            className="input input-bordered w-full"
            {...register("mobile", { required: true })}
          />
          {errors.mobile && <span className="text-error text-sm">Mobile is required</span>}
        </div>

       
        <div>
          <label className="font-semibold">Additional Info (optional)</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("addInfo")}
          />
        </div>

       

        <button type="submit" className="btn btn-primary mt-4 w-full">
          Update Experience
        </button>
      </form>
    </div>
  );
}
