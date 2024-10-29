// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";
import DrivesIcon from "./Icons/DrivesIcon";
// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  // Navigation

  // Drives
  const [drives, setDrives] = useState([]);

  const [selectedType, setSelectedtype] = useState(null);
  useEffect(() => {
    async function Fetch() {
      await invoke("fetch_logical_drives").then((res) => {
        const drivesWithIcons = res.map((drive) => ({
          ...drive,
          icon: <DrivesIcon />,
        }));

        setDrives(drivesWithIcons);
      });
    }
    Fetch();
  }, []);

  //Fetch Content

  async function FetchContent(path) {
    function absolute_path(path) {
      return path.startsWith("/") ? path.slice(1) : path;
    }

    console.log("ContentPage is rendering for path: " + path);
    const finalPath = path === "C:" ? "C:/" : absolute_path(path);
    console.log("Final path for reading content: " + finalPath);

    await Read(finalPath);
  }

  // File System Functions
  const [content, setContent] = useState([]);
  const [currentPath, setCurrentPath] = useState("/");

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
    setCurrentPath(path);
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
        currentPath,
        setCurrentPath,
        FetchContent,
        selectedType,
        setSelectedtype,
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
