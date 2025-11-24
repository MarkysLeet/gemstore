"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (emailOrPhone: string, password: string) => boolean;
  register: (email: string, phone: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initialize = () => {
      const savedUser = localStorage.getItem("avenue-user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
        } catch (e) {
          console.error(e);
        }
      }
    };
    initialize();
  }, []);

  const login = (emailOrPhone: string, password: string): boolean => {
    // Admin Check
    if (emailOrPhone === "admin" && password === "grozan") {
      const adminUser: User = {
        id: "admin",
        name: "Administrator",
        email: "admin@avenue.pro",
        role: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("avenue-user", JSON.stringify(adminUser));
      router.push("/admin");
      return true;
    }

    // Regular User Check
    const usersJson = localStorage.getItem("avenue-users-db");
    if (usersJson) {
      const users = JSON.parse(usersJson);
      // Find user by email or phone
      const foundUser = users.find(
        (u: User & { password?: string }) =>
          (u.email === emailOrPhone || u.phone === emailOrPhone) &&
          u.password === password
      );

      if (foundUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...safeUser } = foundUser;
        setUser(safeUser);
        localStorage.setItem("avenue-user", JSON.stringify(safeUser));
        router.push("/profile");
        return true;
      }
    }

    return false;
  };

  const register = (email: string, phone: string, password: string): boolean => {
    const usersJson = localStorage.getItem("avenue-users-db");
    const users = usersJson ? JSON.parse(usersJson) : [];

    // Check if exists
    if (users.find((u: User) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0], // Default name from email
      email,
      phone,
      password, // In a real app, never store passwords like this!
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("avenue-users-db", JSON.stringify(users));

    // Auto login after register
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = newUser;
    setUser(safeUser as User);
    localStorage.setItem("avenue-user", JSON.stringify(safeUser));
    router.push("/profile");

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("avenue-user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin"
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
