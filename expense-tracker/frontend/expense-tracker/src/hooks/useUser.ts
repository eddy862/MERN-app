import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { IUser } from "../types/user";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/api/user");

        if (response.data && response.data.user) {
          const fetchedUser = response.data.user;
          setUser(fetchedUser);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            navigate("/login");
          }
        }
      }
    };
    fetchUser();
  }, []);

  return user;
};

export default useUser;
