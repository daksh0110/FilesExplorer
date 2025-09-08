import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RighClickContextMenu from "./components/RightClickContextMenu";
import { useAuth } from "./AuthContext";
import FileRow from "./components/FileRow/FileRow";

export default function ContentPage() {
  const { "*": path } = useParams();
  const navigate = useNavigate();
  const { FetchContent, content, ReadFile } = useAuth();

  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [entryPath, setEntryPath] = useState<string | null>(null);
  const [entryname, setEntryName] = useState<string | null>(null);

  useEffect(() => {
    FetchContent(path || "");
    console.log(content);
  }, [path]);

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

      {/* IMPORTANT: this container must be flex-1 + min-h-0 and NOT overflow itself */}
      <div
        className="flex-1 min-h-0 flex flex-col"
        onContextMenu={(e) => {
          e.preventDefault();
          if (!isOpen) handleContextMenu(e, "empty-space");
        }}
      >
        {/* Optional: header row for toolbars / breadcrumbs inside the card 
            Keep it flex-none so it doesn't try to scroll */}
        {/* <div className="flex-none px-4 py-2 border-b bg-white">...</div> */}

        {/* The ONLY scrollable area */}
        <div className="flex-1 min-h-0 overflow-auto overscroll-contain rounded-md border border-gray-200">
          <table className="min-w-full table-fixed text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 border-b w-1/2">Name</th>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
