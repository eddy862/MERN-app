import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "./../../utils/helper";

type Props = {};

const Login = (props: Props) => {
  const [loginInfo, setLoginInfo] = useState({ email: "", pwd: "" });
  const [error, setError] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value.replace(/\s+/g, ""), //prevent enter whitespace
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //check empty email
    if (!loginInfo.email.trim()) {
      setError("Please enter email address.");
      return;
    }

    //validate email
    if (!validateEmail(loginInfo.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    //check empty password
    if (!loginInfo.pwd.trim()) {
      setError("Please enter password.");
      return;
    }

    //API call - email exist? password correct?

    setError("");
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={loginInfo.email}
              name="email"
              onChange={handleChangeInput}
            />

            <PasswordInput value={loginInfo.pwd} onChange={handleChangeInput} />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not register yet?{" "}
              <Link
                to={"/signup"}
                className="font-medium underline text-primary"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;