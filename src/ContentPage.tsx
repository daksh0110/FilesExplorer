import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RighClickContextMenu from "./components/RightClickContextMenu";
import { useAuth } from "./AuthContext";
import FileRow from "./components/FileRow/FileRow";

export default function ContentPage() {
  const { "*": path } = useParams();
  const navigate = useNavigate();
  const {
    FetchContent,
    content,
    ReadFile,
    query, // add query from context
    offset,
    setOffset,
    fetchSearch, // add fetchSearch from context
  } = useAuth();

  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [entryPath, setEntryPath] = useState<string | null>(null);
  const [entryname, setEntryName] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLTableRowElement | null>(null);
  const limit = 100;

  useEffect(() => {
    FetchContent(path || "");
  }, [path]);

  // 👇 IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!query) return; // only when searching

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const nextOffset = offset + limit;
          setOffset(nextOffset);
          fetchSearch(query, nextOffset);
        }
      },
      { rootMargin: "200px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [query, offset, fetchSearch]);

  const handleClick = (p: string, file_type: string) => {
    if (file_type === "Directory") {
      const cleanedPath = p.startsWith("/") ? p.slice(1) : p;
      navigate("/" + cleanedPath);
    } else {
      ReadFile(p);
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent,
    type: string,
    entrypath?: string,
    name?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setSelectedType(type);
    setEntryPath(entrypath || null);
    setEntryName(name || null);
    setTimeout(() => setOpen(true), 10);
  };

  return (
    <>
      <RighClickContextMenu
        anchorPoint={anchorPoint}
        isOpen={isOpen}
        setOpen={setOpen}
        path={path}
        selectedType={selectedType}
        entryPath={entryPath}
        entryName={entryname}
      />

      <div
        className="flex-1 min-h-0 flex flex-col"
        onContextMenu={(e) => {
          e.preventDefault();
          if (!isOpen) handleContextMenu(e, "empty-space");
        }}
      >
        <div
          className="flex-1 h-full overflow-auto overscroll-contain rounded-md border border-gray-200"
          style={{ transform: "translateZ(0)" }}
        >
          <table className="min-w-full table-fixed border-collapse text-sm text-left">
            <thead
              className="sticky top-0 z-10"
              style={{ backgroundColor: "#f3f4f6", willChange: "transform" }}
            >
              <tr>
                <th className="px-4 py-2 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis border-b">
                  Name
                </th>
                <th className="px-4 py-3 border-b w-1/6">Type</th>
                <th className="px-4 py-3 border-b w-1/6">Size</th>
                <th className="px-4 py-3 border-b w-1/6">Date Modified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {content.map((entry, index) => (
                <FileRow
                  key={index}
                  entry={entry}
                  onDoubleClick={handleClick}
                  onContextMenu={handleContextMenu}
                />
              ))}

              {/* 👇 Sentinel row */}
              {query && (
                <tr ref={sentinelRef}>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    Loading more…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
