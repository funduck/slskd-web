"use client";

import { ModalsProvider, modals } from "@mantine/modals";
import { createContext, useContext, useEffect, useState } from "react";

import { LoginModal } from "./LoginModal";
import { getSessionEnabledAction, loginAction, validateSessionAction } from "./actions";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<string>();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(`Checking authentication with stored token: ${storedToken}`);

    try {
      // Check if security is enabled
      const securityEnabled = await getSessionEnabledAction(storedToken);

      if (!securityEnabled) {
        console.log("Security is disabled on the server.");
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Try to validate existing token
      await validateSessionAction(storedToken);

      console.log("Session is valid");
      setIsAuthenticated(true);
      setToken(storedToken);
    } catch (error) {
      setToken(null);
      localStorage.removeItem("authToken");
      console.log("Session is invalid or not authenticated");
      setIsAuthenticated(false);
      // Show login modal if auth fails
      openLoginModal();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setIsLoginLoading(true);
    setLoginError(undefined);
    try {
      const { token } = await loginAction({ username, password });

      if (token) {
        console.log("Login successful, received token");
        setToken(token);
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true);
        modals.closeAll();
      } else {
        console.log("Login failed: no token received");
      }
    } catch (error) {
      console.log("Login failed with error:", error);
      setLoginError(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoginLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out");
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    openLoginModal();
  };

  const openLoginModal = () => {
    modals.open({
      modalId: "login-modal",
      title: "Login to Slskd",
      children: <LoginModal onLogin={login} error={loginError} loading={isLoginLoading} />,
      closeOnClickOutside: false,
      closeOnEscape: false,
      withCloseButton: false,
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, token }}>{children}</AuthContext.Provider>
  );
}
