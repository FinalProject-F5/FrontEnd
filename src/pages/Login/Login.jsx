import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  return (
    <>
      <Header />
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)", 
      }}
    >
     
      <div className="card w-96 bg-base-100 shadow-xl p-4">
        <div className="card-body items-center text-left">
          <h2 className="card-title text-4xl font-bold text-primary mb-6">Login</h2> 

       
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full max-w-xs mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>
       
          <button className="btn btn-primary w-full text-lg py-3 rounded-lg mb-4">Login</button>
          
         
          <div className="text-sm">
            <p className="mb-1">Not registered yet?{' '}
              <a href="#" className="link link-hover text-primary font-semibold">Sign up here</a>
            </p>
            <a href="#" className="link link-hover text-neutral-content">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
          <Footer />
        </>
  );
}