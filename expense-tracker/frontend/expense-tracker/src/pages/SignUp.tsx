import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuth from "../layouts/UserAuth";
import ThirdpartySignup from "../components/ThirdpartySignup";
import { validatePassword, verifyEmail } from "../utils/helper";
import { isAxiosError } from "axios";
import axiosInstance from "../utils/axiosInstance";

type Props = {};

type SignUpInfo = {
  username: string;
  email: string;
  password: string;
};

const SignUp = (props: Props) => {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo>({
    username: "",
    email: "",
    password: "",
  });
  const [loginAfterRegister, setLoginAfterRegister] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signUpInfo.username.trim()) {
      setError("Please enter username.");
      return;
    }

    if (signUpInfo.username.trim().length < 5) {
      setError("Username must be at least 5 characters.");
      return;
    }

    if (!signUpInfo.email.trim()) {
      setError("Please enter email address.");
      return;
    }

    if (!verifyEmail(signUpInfo.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!signUpInfo.password.trim()) {
      setError("Please enter password.");
      return;
    }

    if (signUpInfo.password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!validatePassword(signUpInfo.password.trim())) {
      setError("Password is invalid.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(
        "/api/auth/register",
        signUpInfo
      );

      if (loginAfterRegister) {
        {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          navigate("/dashboard");
        }
      } else {
        setSignUpInfo({ username: "", email: "", password: "" });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response && error.response.data.msg) {
          if (Array.isArray(error.response.data.msg)) {
            setError(error.response.data.msg[0].msg);
          } else {
            setError(error.response.data.msg);
          }
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <UserAuth>
      <form onSubmit={handleSignUp}>
        <h4 className="text-3xl font-semibold mb-5">Sign Up</h4>

        <div className="flex flex-col mb-2">
          <label className="required-label" htmlFor="username">
            Username
          </label>
          <input
            className="input-box1"
            type="text"
            name="username"
            id="username"
            value={signUpInfo.username}
            onChange={handleChangeInput}
          />
          <p className="text-xs text-slate-600 mt-0.5">At least 5 characters</p>
        </div>

        <div className="flex flex-col mb-2">
          <label className="required-label" htmlFor="email">
            Email
          </label>
          <input
            className="input-box1"
            type="text"
            name="email"
            id="email"
            value={signUpInfo.email}
            onChange={handleChangeInput}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="required-label" htmlFor="password">
            Password
          </label>
          <input
            className="input-box1"
            type="password"
            name="password"
            id="password"
            value={signUpInfo.password}
            onChange={handleChangeInput}
          />
          <p className="text-xs text-slate-600 mt-0.5">
            At least 6 characters and contains at least one uppercase,
            lowercase, number, and special character
          </p>
        </div>

        {error && <p className="error-text mb-2">{error}</p>}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="login-checkbox"
            onChange={(e) => setLoginAfterRegister(e.target.checked)}
          />
          <label
            className="text-sm text-slate-700 pl-1"
            htmlFor="login-checkbox"
          >
            Login after registration
          </label>
        </div>

        <button className="btn-primary mt-3" type="submit">
          Register
        </button>
      </form>

      <ThirdpartySignup method="signup" />

      <p className="text-center text-sm">
        <span className="font-semibold">Already have an account?</span>
        <Link className="underline text-purple-800 pl-1" to="/login">
          Login
        </Link>
      </p>
    </UserAuth>
  );
};

export default SignUp;
