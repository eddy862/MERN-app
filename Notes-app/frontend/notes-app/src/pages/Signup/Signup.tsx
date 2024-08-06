import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "./../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { SignupResponse } from "../../types/apiTypes";

type Props = {};

const Signup = (props: Props) => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    pwd: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the input is the password or email field, remove whitespace
    const sanitizedValue = ["pwd", "email"].includes(name)
      ? value.replace(/\s+/g, "")
      : value;

    setSignupInfo((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //check empty name
    if (!signupInfo.name.trim()) {
      setError("Please enter name.");
      return;
    }

    //check empty email
    if (!signupInfo.email.trim()) {
      setError("Please enter email address.");
      return;
    }

    //validate email
    if (!validateEmail(signupInfo.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    //check empty password
    if (!signupInfo.pwd.trim()) {
      setError("Please enter password.");
      return;
    }

    setError("");

    //API call
    try {
      const { data }: { data: SignupResponse } = await axiosInstance.post(
        "/user",
        {
          fullName: signupInfo.name,
          email: signupInfo.email,
          password: signupInfo.pwd,
        }
      );

      //store token
      if (data && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.data && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError("An unexpected error occured. Please try again");
        }
      } else {
        setError("An unexpected error occured. Please try again");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded px-7 py-10">
          <form onSubmit={(e) => handleSignup(e)}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={signupInfo.name}
              name="name"
              onChange={handleChangeInput}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={signupInfo.email}
              name="email"
              onChange={handleChangeInput}
            />

            <PasswordInput
              value={signupInfo.pwd}
              onChange={handleChangeInput}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium underline text-primary"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
