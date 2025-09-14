import { IoMdSearch } from "react-icons/io";
import { useState, useEffect, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { FileItem, useAuth } from "../../AuthContext";

export default function NavSearch() {
  const {
    currentPath,
    FetchContent,
    setCurrentPath,
    setContent,
    setIsSearching,
  } = useAuth();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 100;

  // Listen for streamed results
  useEffect(() => {
    let unlistenResult: (() => void) | undefined;
    let unlistenDone: (() => void) | undefined;

    async function setupListeners() {
      unlistenResult = await listen("search://result", (event) => {
        const results: FileItem[] = event.payload as FileItem[];
        setContent((prev: FileItem[]) => [...prev, ...results]);
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

  const fetchSearch = useCallback(
    async (q: string, newOffset: number) => {
      try {
        setLoading(true);
        await invoke("search_command", {
          path: currentPath,
          query: q,
          offset: newOffset,
          limit,
        });
        setCurrentPath(currentPath);
      } catch (err) {
        console.error("Error searching files:", err);
        setLoading(false);
      }
    },
    [currentPath, limit, setCurrentPath]
  );

  const handleSearch = async (value: string) => {
    setQuery(value);
    setIsSearching(!!value);

    if (!value) {
      setContent([]);
      setOffset(0);
      setLoading(false);
      FetchContent(currentPath);
      return;
    }

    setContent([]);
    setOffset(0);
    fetchSearch(value, 0);
  };

  useEffect(() => {
    // If query is empty, stop searching immediately
    if (!query) {
      setIsSearching(false);
      setLoading(false);
      setContent([]);
      FetchContent(currentPath);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Load next page on scroll bottom
  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        query
      ) {
        const nextOffset = offset + limit;
        setOffset(nextOffset);
        setLoading(true);
        fetchSearch(query, nextOffset);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, loading, query, fetchSearch]);

  // Reset to folder content when query cleared
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
