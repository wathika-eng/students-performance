import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";

const API = process.env.EXPO_PUBLIC_API_URL;

if (!API) {
  console.error("API URL is not set in .env");
}

console.log(API);

export type User = {
  fullName: string;
  id?: string;
  email: string;
  phone_number?: string;
};

type UserAuthStore = {
  user: User | null;
  isLoggedin: boolean;
  isGuest: boolean;
  guestExpiry?: number;
  signup: (user: User, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  startGuestSession: () => void;
  checkSession: () => Promise<boolean | User>;
};

export const useUserStore = create<UserAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedin: false,
      isGuest: false,
      guestExpiry: undefined,

      signup: async (user, password) => {
        try {
          const payload = {
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phone_number,
            //admNo: user.admNo,
            password: password,
          };
          const res = await axios.post(`${API}/users`, payload);

          if (res.status !== 201) {
            throw new Error(
              `failed to create an account: ${res.data?.message}`
            );
          }
          set({
            user: res.data,
            isLoggedin: true,
            isGuest: false,
            guestExpiry: undefined,
          });
        } catch (error) {
          console.error("Signup error:", error.response?.data || error.message);
          throw error;
        }
      },

      login: async (email, password) => {
        try {
          // const res = await fetch(`${API}/login`, { ... });
          if (email !== "kamaa@gmail.com" || password !== "kamaa12300") {
            throw new Error("wrong credentials");
          }
          set({
            user: { id: "1", email: "Kamaa" },
            isLoggedin: true,
            isGuest: false,
            guestExpiry: undefined,
          });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

      logout: async () => {
        // Clear the state
        set({
          user: null,
          isLoggedin: false,
          isGuest: false,
          guestExpiry: undefined,
        });

        // Remove persisted user from storage
        try {
          await AsyncStorage.removeItem("user");
          console.log("User logged out and storage cleared");
        } catch (e) {
          console.error("Failed to clear AsyncStorage on logout", e);
        }
      },

      startGuestSession: () => {
        const expiry = Date.now() + 5 * 60 * 1000; // expires in 5 minutes
        set({
          user: { id: "Test001", email: "guest@shule.com" },
          isGuest: true,
          isLoggedin: true,
          guestExpiry: expiry,
        });
      },

      checkSession: async () => {
        const { isGuest, guestExpiry, logout, user } = get();

        // optional: persist user on AsyncStorage for web/mobile consistency
        const storedUser = await AsyncStorage.getItem("user");
        const parsedUser: User | null = storedUser
          ? JSON.parse(storedUser)
          : null;

        const currentUser = user || parsedUser;

        if (isGuest && guestExpiry && Date.now() > guestExpiry) {
          logout();
          await AsyncStorage.removeItem("user");
          return false;
        }

        if (currentUser) return currentUser;
        return false;
      },
    }),
    {
      name: "users-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
