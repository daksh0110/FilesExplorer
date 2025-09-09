import { IoMdSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { useAuth } from "../../AuthContext";
import { Entry } from "../FileRow/FileRow";

export default function NavSearch() {
  const { currentPath, FetchContent, setCurrentPath, setContent } = useAuth();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Listen for streamed results
  useEffect(() => {
    let unlistenResult: (() => void) | undefined;
    let unlistenDone: (() => void) | undefined;

    async function setupListeners() {
      unlistenResult = await listen("search://result", (event) => {
        const r: any = event.payload;
        setContent((prev: Entry[]) => [
          ...prev,
          {
            name: r.name,
            path: r.path,
            file_type: r.file_type,
            size: "",
            modified: "",
            extension: r.name.split(".").pop() || "",
          },
        ]);
      });

      unlistenDone = await listen("search://done", () => {
        setLoading(false);
      });
    }

    setupListeners();

    return () => {
      if (unlistenResult) unlistenResult();
      if (unlistenDone) unlistenDone();
    };
  }, [setContent]);

  // Trigger search
  const handleSearch = async (value: string) => {
    setQuery(value);

    if (!value) {
      // Reset to folder content if query is empty
      FetchContent(currentPath);
      return;
    }

    try {
      setContent([]); // clear previous search results
      setLoading(true);

      console.log("🔍 Starting search for:", value);

      await invoke("search_command", {
        path: currentPath,
        query: value,
        offset: 0,
        limit: 1000,
      });

      setCurrentPath(currentPath);
    } catch (err) {
      setLoading(false);
      console.error("Error searching files:", err);
    }
  };

  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!query) {
      FetchContent(currentPath);
    }
  }, [currentPath, query]);
  return (
    <div className="relative w-full">
      <IoMdSearch
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800 bg-gray-100"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          Searching...
        </span>
      )}
    </div>
  );
}
