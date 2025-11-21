"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ModalsProvider, modals } from "@mantine/modals";
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

  // Load token from storage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const checkAuth = async () => {
    try {
      // Check if security is enabled
      const securityEnabled = await getSessionEnabledAction(token);

      if (!securityEnabled) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Try to validate existing token
      await validateSessionAction(token);
      setIsAuthenticated(true);
    } catch (error) {
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
        setToken(token);
        setIsAuthenticated(true);
        modals.closeAll();
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoginLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
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
