import React from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="card w-96 bg-base-100 shadow-xl p-4">
          <div className="card-body items-center text-left">
            <h2 className="card-title text-4xl font-bold text-primary mb-6">
              Login
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-error text-sm mt-1 text-primary">
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
                  placeholder="Password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-error text-sm mt-1 text-primary">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full text-lg py-3 rounded-lg mb-4"
              >
                Login
              </button>
            </form>
            <div className="text-sm">
              <p className="mb-1">
                Not registered yet?{" "}
                <a
                  href="#"
                  className="link link-hover text-primary font-semibold"
                >
                  Sign up here
                </a>
              </p>
              <a href="#" className="link link-hover text-neutral-content">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
