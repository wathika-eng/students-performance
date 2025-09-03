import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API = process.env.APIURL;

type User = {
  id: string;
  email: string;
  phone_number?: string;
};

type UserAuthStore = {
  user: User | null;
  isLoggedin: boolean;
  isGuest: boolean;
  guestExpiry?: number;
  signup: (
    email: string,
    phone_number: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  startGuestSession: () => void;
  checkSession: () => boolean | User;
};

export const useUserStore = create<UserAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedin: false,
      isGuest: false,
      guestExpiry: undefined,

      signup: async (email, phone_number, password) => {
        // call API here
        set({
          user: { id: "new-user", email, phone_number },
          isLoggedin: true,
          isGuest: false,
          guestExpiry: undefined,
        });
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

      logout: () =>
        set({
          user: null,
          isLoggedin: false,
          isGuest: false,
          guestExpiry: undefined,
        }),

      startGuestSession: () => {
        const expiry = Date.now() + 5 * 60 * 1000; // expires in 5 minutes
        set({
          user: { id: "Test001", email: "guest@shule.com" },
          isGuest: true,
          isLoggedin: true,
          guestExpiry: expiry,
        });
      },

      checkSession: (): boolean | User => {
        const { isGuest, guestExpiry, logout, user } = get();
        console.log(user?.email);
        if (isGuest && guestExpiry && Date.now() > guestExpiry) {
          logout();
          return false;
        }
        if (user !== null) {
          return user;
        } else return false;
      },
    }),
    {
      name: "users-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
