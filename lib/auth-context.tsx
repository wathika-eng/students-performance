import { createContext } from "react";

type AuthContextType = {
    
};

const AuthContext = createContext(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	return <></>;
}

// returns the auth provider hook instead of having to repeart
export function useAuth() {}
