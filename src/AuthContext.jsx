// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { invoke } from "@tauri-apps/api/core";

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Navigation

  // Drives
  const [drives, setDrives] = useState([]);
  useEffect(() => {
    async function Fetch() {
      await invoke("fetch_logical_drives").then((res) => {
        setDrives(res);
      });
    }
    Fetch();
  }, []);

  // File System Functions
  const [content, setContent] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login successful:", tokenResponse);
      setIsLoggedIn(true);
      setUser(tokenResponse.access_token);

      localStorage.setItem("token", tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Login Failed", error);
    },
    scope:
      "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
  });

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    console.log("Logged out");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      setUser(token);

      // Optionally fetch user info or decode the token
    }
  }, []);

  async function Read(path) {
    const res = await invoke("read", { path: path });

    setContent(res);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        drives,
        Read,
        content,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
