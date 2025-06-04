import { yupResolver } from "@hookform/resolvers/yup";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { auth } from "../firebase/firebaseConfig";

function ForgotPasswordPage() {
  const [captcha, setCaptcha] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let schema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter an email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, data.email);
      setMessage(
        "Password reset email sent! Check your inbox. If you dont see it in a few minutes please check your spam folder."
      );
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-md w-full">
        <p className="text-2xl mb-2 font-bold textGradient text-center">
          Reset Your Password
        </p>
        {error && (
          <p
            className={`border p-4 rounded-xl mb-4 border-red-300 bg-red-200 text-red-500`}
          >
            {error}
          </p>
        )}
        <div className="card">
          {message && (
            <div>
              <p
                className={`border p-4 rounded-xl  border-gray-200 text-gray-600`}
              >
                {message}
              </p>
              <button className="btn-primary w-full mt-4">
                <Link to="/signin">Return to sign in</Link>
              </button>
            </div>
          )}
          {!message && (
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="flex flex-col"
            >
              <label
                htmlFor="emailAssociated"
                className="text-start mb-2 text-text"
              >
                Enter the email associated with your account
              </label>
              <input
                type="text"
                id="emailAssociated"
                placeholder="Email"
                className="input"
                {...register("email")}
              />
              {errors.email && (
                <p className="self-start mt-2 text-red-500">
                  {errors.email?.message}
                </p>
              )}

              <ReCAPTCHA
                className="mt-4 mx-auto"
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(e) => setCaptcha(e)}
              />

              <button
                type="submit"
                disabled={isLoading || !captcha}
                className="btn-primary mt-4"
              >
                Send password reset email
              </button>
              <Link className="text-primary text-center mt-1" to="/signin">
                Return to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
