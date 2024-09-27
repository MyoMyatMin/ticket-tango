
'use client';

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated") === "true";
    setIsAuthenticated(authenticated);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("authenticated");
    }
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
