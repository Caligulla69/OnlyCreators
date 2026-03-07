import api from "./api";

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Invalid email or password. Please try again.";
      throw new Error(message);
    }
  },

  async signup(name, email, password) {
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create account. Please try again.";
      throw new Error(message);
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to send reset email. Please try again.";
      throw new Error(message);
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await api.put(`/auth/reset-password/${token}`, {
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      throw new Error(message);
    }
  },

  async verifyToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await api.get("/auth/verify");
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      // If token is invalid or expired, clean up
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return null;
    }
  },

  async getMe() {
    try {
      const response = await api.get("/auth/me");
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch user profile.";
      throw new Error(message);
    }
  },

  async updateProfile(updates) {
    try {
      const response = await api.put("/auth/update-profile", updates);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile.";
      throw new Error(message);
    }
  },

  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await api.put("/auth/update-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update password.";
      throw new Error(message);
    }
  },

  async deleteAccount() {
    try {
      const response = await api.delete("/auth/delete-account");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete account.";
      throw new Error(message);
    }
  },
};

export default authService;
