import { create } from "zustand";

const useAuthStore = create((set) => ({
  token:
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,

  login: async (username, password) => {
    if (username === "admin" && password === "admin123") {
      const demoToken = "demo-token-123";

      set({ token: demoToken });
      localStorage.setItem("token", demoToken);

      return true;
    } else {
      alert("Invalid Username or Password");
      return false;
    }
  },

  logout: () => {
    set({ token: null });
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;