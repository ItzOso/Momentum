import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import googleIcon from "../assets/Icons/googleIcon.svg";
import { Link } from "react-router-dom";
import {
  googleSignInPopupErrorMessages,
  signinErrorMessages,
} from "../utils/constants";
import { useAuth } from "../contexts/AuthProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignInPage() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signin, signinWithGoogle } = useAuth();

  let schema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter an email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Please enter a password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSignin = async (data) => {
    setIsSubmitting(true);
    try {
      await signin(data.email, data.password);
    } catch (error) {
      const friendlyErrorMessage =
        signinErrorMessages[error.code] || signinErrorMessages["auth/unknown"];
      setError(friendlyErrorMessage);
    }
    setIsSubmitting(false);
  };

  const handleSigninWithGoogle = async () => {
    setIsSubmitting(true);
    try {
      await signinWithGoogle();
    } catch (error) {
      const friendlyErrorMessage =
        googleSignInPopupErrorMessages[error.code] ||
        googleSignInPopupErrorMessages["auth/unknown"];
      setError(friendlyErrorMessage);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-md w-full">
        <p className="text-center textGradient text-2xl font-bold">
          Welcome Back!
        </p>
        <p className="text-center text-sm text-gray-600 mb-4">
          Sign in to continue managing your projects effectively
        </p>

        <form
          onSubmit={handleSubmit(handleSignin)}
          className="card flex flex-col gap-4"
        >
          {error && (
            <p className="border text-sm border-red-300 bg-red-200 text-red-400 p-4 rounded-xl">
              {error}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              className="input"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400">{errors.email?.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                className="input w-full"
                placeholder="Enter a password"
                {...register("password")}
              />
              {!showPass ? (
                <FaEye
                  onClick={() => setShowPass(true)}
                  className="absolute right-4 top-3 text-text-light text-lg cursor-pointer text-gray-600"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPass(false)}
                  className="absolute right-4 top-3 text-text-light text-lg cursor-pointer text-gray-600"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-400">{errors.password?.message}</p>
            )}
            <Link
              to="/forgot-password"
              className="self-end text-primary text-sm w-fit"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary  "
          >
            {isSubmitting && (
              <AiOutlineLoading3Quarters className="animate-spin" />
            )}
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-2">
            <hr className="text-gray-200" />
            <p className="-mt-3 text-text bg-white px-3 w-fit mx-auto text-sm text-gray-600">
              Or
            </p>
          </div>

          <button
            type="button"
            onClick={handleSigninWithGoogle}
            disabled={isSubmitting}
            className="btn-secondary text-gray-600"
          >
            <img src={googleIcon} alt="google logo icon" />
            <span className="text-text">Sign in with Google</span>
          </button>
          <p className="text-center text-sm text-gray-600">
            Dont have an account yet?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
