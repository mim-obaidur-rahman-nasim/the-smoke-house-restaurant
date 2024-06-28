/* eslint-disable react/prop-types */
// AuthContext.js
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../pages/shared/Loading";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRole = async (_token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/user/role`,
        {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        }
      );

      setRole(response?.data?.role);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      getRole(token);
    }
    setLoading(false);
  }, []);

  const login = async (token) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    await getRole(token);
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
