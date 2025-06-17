import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Experiences } from "../../../service/apiService";
import { useNavigate, useParams } from "react-router-dom";

const experiencesService = new Experiences();

export default function FormEditExperience() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState(null);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exp, cats, cts] = await Promise.all([
          experiencesService.getExperienceById(id),
          experiencesService.getCategories(),
          experiencesService.getCountries()
        ]);

        setExperience(exp);
        setCategories(cats);
        setCountries(cts.sort((a, b) => a.name.localeCompare(b.name)));

      
        reset({
          title: exp.title || "",
          location: exp.location || "",
          category: exp.category || "",
          description: exp.description || "",
          duration: exp.duration || "",
          price: exp.price || 0,
          itinerary: exp.itinerary || "",
          observation: exp.observation || "",
          host: exp.host || "",
          email: exp.email || "",
          mobile: exp.mobile || "",
          addInfo: exp.addInfo || ""
        });

        setLoading(false);
      } catch (error) {
        console.error("Error loading experience:", error);
        alert("Error loading experience.");
        navigate("/");
      }
    };

    fetchData();
  }, [id, navigate, reset]);

  const onSubmit = async (formData) => {
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("duration", formData.duration);
      data.append("price", formData.price);
      data.append("itinerary", formData.itinerary);
      data.append("observation", formData.observation);
      data.append("host", formData.host);
      data.append("email", formData.email);
      data.append("mobile", formData.mobile);
      data.append("addInfo", formData.addInfo);

      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          data.append("images", formData.images[i]);
        }
      }

      await experiencesService.updateExperiences(id, data); 

      alert("Experience updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update experience.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Edit Experience</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-semibold">Title</label>
          <input className="input input-bordered w-full" {...register("title", { required: true })} />
          {errors.title && <span className="text-error text-sm">Title is required</span>}
        </div>

        <div>
          <label className="font-semibold">Country</label>
          <select className="select select-bordered w-full" {...register("location", { required: true })}>
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.code} value={c.name}>{c.name}</option>
            ))}
          </select>
          {errors.location && <span className="text-error text-sm">Country is required</span>}
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <select className="select select-bordered w-full" {...register("category", { required: true })}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <span className="text-error text-sm">Category is required</span>}
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea className="textarea textarea-bordered w-full" {...register("description", { required: true })} />
          {errors.description && <span className="text-error text-sm">Description is required</span>}
        </div>

        <div>
          <label className="font-semibold">Duration (hours)</label>
          <input className="input input-bordered w-full" {...register("duration", { required: true })} />
          {errors.duration && <span className="text-error text-sm">Duration is required</span>}
        </div>

        <div>
          <label className="font-semibold">Price (EUR)</label>
          <input type="number" className="input input-bordered w-full" {...register("price")} />
        </div>

        <div>
          <label className="font-semibold">Itinerary (optional)</label>
          <textarea className="textarea textarea-bordered w-full" {...register("itinerary")} />
        </div>

        <div>
          <label className="font-semibold">Observations (optional)</label>
          <textarea className="textarea textarea-bordered w-full" {...register("observation")} />
        </div>

        <div>
          <label className="font-semibold">Host Name</label>
          <input className="input input-bordered w-full" {...register("host", { required: true })} />
          {errors.host && <span className="text-error text-sm">Host is required</span>}
        </div>

        <div>
          <label className="font-semibold">Email (optional)</label>
          <input type="email" className="input input-bordered w-full" {...register("email")} />
        </div>

        <div>
          <label className="font-semibold">Mobile</label>
          <input type="tel" className="input input-bordered w-full" {...register("mobile", { required: true })} />
          {errors.mobile && <span className="text-error text-sm">Mobile is required</span>}
        </div>

        <div>
          <label className="font-semibold">Additional Info (optional)</label>
          <textarea className="textarea textarea-bordered w-full" {...register("addInfo")} />
        </div>

        <div>
          <label className="font-semibold">Upload New Images (optional)</label>
          <input type="file" multiple accept="image/*" className="file-input file-input-bordered w-full" {...register("images")} />
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-full">Update Experience</button>
      </form>
    </div>
  );
}
