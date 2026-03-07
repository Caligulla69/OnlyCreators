import { createContext, useState, useCallback, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          // Verify token with backend
          const response = await api.get("/auth/verify");
          if (response.data.success) {
            const userData = response.data.data;
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(userData));
          } else {
            // Token invalid, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          // If verify fails (e.g., server down), still use stored user for offline-ish mode
          // but if it's a 401, clear everything
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          } else {
            // Server might be down, use cached user
            try {
              setUser(JSON.parse(storedUser));
              setIsAuthenticated(true);
            } catch {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.success) {
        const { token, user: userData } = response.data;

        // Store token and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password. Please try again.";
      throw new Error(message);
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const { token, user: userData } = response.data;

        // Store token and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (error) {
      setIsLoading(false);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create account. Please try again.";
      throw new Error(message);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call backend logout endpoint
      await api.post("/auth/logout");
    } catch (error) {
      // Even if the API call fails, clear local state
      console.warn("Logout API call failed:", error.message);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const updateUser = useCallback(async (updates) => {
    try {
      const response = await api.put("/auth/update-profile", updates);

      if (response.data.success) {
        const updatedUser = response.data.data;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true, data: updatedUser };
      }
    } catch (error) {
      // Fall back to local update if API fails
      console.warn(
        "Profile update API call failed, updating locally:",
        error.message,
      );
      setUser((prev) => {
        const updated = { ...prev, ...updates };
        localStorage.setItem("user", JSON.stringify(updated));
        return updated;
      });
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
