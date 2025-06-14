import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../service/authService";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const authService = new AuthService();

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      setSuccess("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error during registration. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center [filter:sepia(40%)]"
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/860594926/es/foto/casa-de-china.jpg?s=1024x1024&w=is&k=20&c=K6qYXr8XlxNEN7KGcRibYJMN2xA4mub7Mlunc2zgiHE=)",
        }}
      >
        <div className="card w-96 bg-base-100 shadow-xl p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body items-center text-left">
              <h2 className="card-title text-4xl font-bold text-primary mb-6">
                Register
              </h2>
              {error && (
                <div role="alert" className="alert alert-warning text-neutral">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div role="alert" className="alert alert-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{success}</span>
                </div>
              )}

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name must be at most 50 characters long",
                    },
                  })}
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <span className="text-error text-sm mt-1 ">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <span className="text-error text-sm mt-1 ">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-control w-full max-w-xs mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "Password must be at least 8 characters. 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
                    },
                  })}
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
                {errors.password && (
                  <span className="text-error text-sm mt-1 ">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full text-lg py-3 rounded-lg mb-4"
              >
                Register
              </button>

              <div className="text-sm">
                <p className="mb-1">
                  Already registered?{" "}
                  <a
                    href="./Login"
                    className="link link-hover text-primary font-semibold"
                  >
                    Log in here
                  </a>
                </p>
               
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
