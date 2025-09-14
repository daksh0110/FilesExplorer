// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { invoke } from "@tauri-apps/api/core";

import DrivesIcon from "./Icons/DrivesIcon";
import DocumentsIcon from "./Icons/DocumentsIcon";
import DownloadsIcon from "./Icons/DownloadsIcon";
import PicturesIcon from "./Icons/PicturesIcon";
import VideosIcon from "./Icons/VideosIcon";
import { Drive } from "./types";

interface Shortcut {
  name: string;
  mount_point: string;
  icon: React.ReactNode;
}

export interface FileItem {
  name: string;
  path: string;
  file_type?: string;
  accessed?: number;
  created?: number;
  size?: string;
  modified?: string;
  extension?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: string | null;
  login: () => void;
  logout: () => void;
  drives: Drive[];
  shortcuts: Shortcut[];
  content: FileItem[];
  currentPath: string;
  setCurrentPath: (path: string) => void;
  FetchContent: (path: string) => Promise<void>;
  ReadDirectory: (path: string) => Promise<void>;
  ReadFile: (path: string) => Promise<void>;
  CopyFile: (path: string, name: string) => Promise<void>;
  Paste: (path: string) => Promise<void>;
  handleDelete: (path: string, selectedType: string | null) => Promise<void>;
  selectedType: string | null;
  setSelectedtype: (type: string | null) => void;
  setContent: (
    content: FileItem[] | ((prev: FileItem[]) => FileItem[])
  ) => void;
  isSearching: boolean;
  setIsSearching: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [drives, setDrives] = useState<Drive[]>([]);
  const [selectedType, setSelectedtype] = useState<string | null>(null);
  const [content, setContent] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState("/home");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    Fetch();
    fetchSidebarShortcuts();
  }, []);

  async function Fetch() {
    const res: Drive[] = await invoke("fetch_logical_drives");
    const drivesWithIcons = res.map((drive) => ({
      ...drive,
      icon: <DrivesIcon />,
    }));
    setDrives(drivesWithIcons);
  }

  async function FetchContent(path: string) {
    function absolute_path(path: string) {
      return path.startsWith("/") ? path.slice(1) : path;
    }
    const finalPath = path === "C:" ? "C:/" : absolute_path(path);
    await ReadDirectory(finalPath);
  }

  async function fetchSidebarShortcuts() {
    const res: Shortcut[] = await invoke("fetch_user_directories");
    const Icons = [
      <DocumentsIcon />,
      <DownloadsIcon />,
      <PicturesIcon />,
      <VideosIcon />,
    ];
    const shortcutWithIcon = res.map((item, index) => ({
      ...item,
      icon: Icons[index],
    }));
    setShortcuts(shortcutWithIcon);
  }

  // File System functions
  async function ReadDirectory(path: string) {
    const res: FileItem[] = await invoke("read", { path });
    setContent(res);
    setCurrentPath(path);
  }

  async function ReadFile(path: string) {
    await invoke("readfile", { path });
  }

  async function CopyFile(path: string, name: string) {
    await invoke("copy", { path, name });
  }

  async function Paste(path: string) {
    await invoke("paste", { path });
  }

  async function handleDelete(path: string, selectedType: string | null) {
    await invoke("delete", { path, filetype: selectedType });
  }

  const login = useGoogleLogin({
    onSuccess: (tokenResponse: TokenResponse) => {
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
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        drives,
        shortcuts,
        content,
        currentPath,
        setCurrentPath,
        FetchContent,
        ReadDirectory,
        ReadFile,
        CopyFile,
        Paste,
        handleDelete,
        selectedType,
        setContent,
        setSelectedtype,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
