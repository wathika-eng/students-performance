import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API = process.env.EXPO_PUBLIC_API_URL;

if (!API) {
  console.error("API URL is not set in .env");
}

console.log(API);

export type User = {
  fullName?: string;
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
  checkSession: () => Promise<boolean | User | null>;
};

const storage =
  Platform.OS === "web"
    ? createJSONStorage(() => {
        if (typeof window === "undefined" || !window.localStorage) {
          throw new Error("localStorage is not available");
        }
        return window.localStorage;
      })
    : createJSONStorage(() => AsyncStorage);

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
          if (Platform.OS !== "web") {
            await AsyncStorage.removeItem("users-storage");
          } else {
            localStorage.removeItem("users-storage");
          }
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

        // // optional: persist user on AsyncStorage for web/mobile consistency
        // let parsedUser = null;
        // if (Platform.OS !== "web") {
        //   const storedUser = await AsyncStorage.getItem("user");
        //   parsedUser = storedUser ? JSON.parse(storedUser) : null;
        // } else {
        //   // fallback for web
        //   console.log("Checking website");
        //   const storedUser =
        //     typeof window !== "undefined"
        //       ? window.localStorage.getItem("user")
        //       : null;
        //   parsedUser = storedUser ? JSON.parse(storedUser) : null;
        // }
        // const currentUser = user || parsedUser;

        if (isGuest && guestExpiry && Date.now() > guestExpiry) {
          logout();
          if (Platform.OS !== "web") {
            await AsyncStorage.removeItem("user");
          } else {
            window.localStorage.removeItem("user");
          }
          return false;
        }

        return user || null;
      },
    }),
    {
      name: "users-storage",
      storage: storage,
    }
  )
);
