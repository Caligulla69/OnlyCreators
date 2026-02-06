// API import reserved for production use
// import api from "./api";

export const authService = {
  async login(email, _password) {
    // For demo purposes, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, this would be:
    // const response = await api.post('/auth/login', { email, password })
    // return response.data

    return {
      user: {
        id: "user_123",
        name: "Sarah Johnson",
        email: email,
        channelName: "TechCreator Daily",
        subscriberCount: 45200,
        profilePicture:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      },
      token: "mock_jwt_token",
    };
  },

  async signup(name, email, _password) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: "user_" + Date.now(),
        name: name,
        email: email,
        channelName: "",
        subscriberCount: 0,
        profilePicture:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      token: "mock_jwt_token",
    };
  },

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async forgotPassword(_email) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Password reset email sent" };
  },

  async resetPassword(_token, _newPassword) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Password reset successful" };
  },

  async verifyToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    // In production, verify token with backend
    // const response = await api.get('/auth/verify')
    // return response.data

    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
