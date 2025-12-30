import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      return { success: false, message: response.data.message || "Login failed" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.errors?.[0] || "Login failed",
      };
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      const response = await api.post("/auth/signup", { fullName, email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: response.data.message || "Signup failed" };
    } catch (error) {
      console.error("Signup error:", error);
      // Handle validation errors with multiple messages
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        return {
          success: false,
          message: error.response.data.errors.join(". ") || "Signup failed",
        };
      }
      // Check if it's a network error
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error') || !error.response) {
        return {
          success: false,
          message: "Cannot connect to server. Please make sure the backend is running on http://localhost:5001",
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || error.message || "Signup failed. Please check your connection and try again.",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};