import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuth from "../layouts/UserAuth";
import ThirdpartySignup from "../components/UserAuth/ThirdpartySignup";
import { validatePassword, verifyEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { isAxiosError } from "axios";

type Props = {};

interface LoginInfo {
  username?: string;
  email?: string;
  password: string;
}

const Login = (props: Props) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    email: "",
    password: "",
  });
  const [useUsernameLogin, setUseUsernameLogin] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (useUsernameLogin) {
      if (!loginInfo.username?.trim()) {
        setError("Please enter username.");
        return;
      }

      if (loginInfo.username.trim().length < 5) {
        setError("Username must be at least 5 characters.");
        return;
      }
    }

    if (!useUsernameLogin) {
      if (!loginInfo.email?.trim()) {
        setError("Please enter email address.");
        return;
      }

      if (!verifyEmail(loginInfo.email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
    }

    if (!loginInfo.password.trim()) {
      setError("Please enter password.");
      return;
    }

    if (loginInfo.password.trim().length < 6) {
      setError("Password must be at least 6 characters.");  
      return;
    }

    if (!validatePassword(loginInfo.password.trim())) {
      setError(
        "Password must contain at least one uppercase, lowercase, number, and special character."
      );
      return;
    }

    setError("");

    try {
      const body: LoginInfo = { password: loginInfo.password.trim() };

      if (useUsernameLogin) {
        body["username"] = loginInfo.username?.trim();
      } else {
        body["email"] = loginInfo.email?.trim();
      }

      const response = await axiosInstance.post("/api/auth/login", body);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/dashboard");
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
      <form onSubmit={handleLogin}>
        <h4 className="text-3xl font-semibold mb-5">Login</h4>

        <div className="flex flex-col mb-2">
          {useUsernameLogin ? (
            <>
              <label className="required-label" htmlFor="email">
                Username
              </label>
              <input
                className="input-box1"
                type="text"
                name="username"
                id="username"
                value={loginInfo.username}
                onChange={handleChangeInput}
              />
            </>
          ) : (
            <>
              <label className="required-label" htmlFor="email">
                Email
              </label>
              <input
                className="input-box1"
                type="text"
                name="email"
                id="email"
                value={loginInfo.email}
                onChange={handleChangeInput}
              />
            </>
          )}
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
            value={loginInfo.password}
            onChange={handleChangeInput}
          />
        </div>

        <p
          className="cursor-pointer text-sm mb-2 text-purple-500"
          onClick={() => setUseUsernameLogin((prev) => !prev)}
        >
          Use {useUsernameLogin ? "email" : "username"} to login
        </p>

        {error && <p className="error-text">{error}</p>}

        <button className="btn-primary mt-3" type="submit">
          Login
        </button>
      </form>

      <ThirdpartySignup method="login" />

      <p className="text-center text-sm">
        <span className="font-semibold">Don't have an account?</span>
        <Link className="underline text-purple-800 pl-1" to="/signup">
          Signup
        </Link>
      </p>
    </UserAuth>
  );
};

export default Login;
