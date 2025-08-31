import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BreadCrumb({ path = [] }: { path: string[] }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("/" + path.join("/"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!editing) {
      const newValue = "/" + path.filter(Boolean).join("/");
      setInputValue(newValue || "/");
    }
  }, [path, editing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditing(false);
      let normalized = inputValue.trim();

      if (!normalized.startsWith("/")) {
        normalized = "/" + normalized;
      }
      normalized = normalized.replace(/\/+/g, "/");

      navigate(normalized);
    } else if (e.key === "Escape") {
      setEditing(false);
      const restored = "/" + path.filter(Boolean).join("/");
      setInputValue(restored || "/");
    }
  };

  return (
    <nav
      tabIndex={0}
      className="bg-gray-100 min-h-10 flex items-center px-3 rounded-lg cursor-text 
             focus:ring-2 focus:ring-blue-400 focus:outline-none transition-shadow"
      aria-label="Breadcrumb"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "A") {
          setEditing(true);
        }
      }}
    >
      {!editing ? (
        <ol className="flex items-center space-x-2 text-gray-800 text-lg font-medium w-full">
          {path.filter(Boolean).map((segment, idx) => {
            const isLast = idx === path.filter(Boolean).length - 1;
            const fullPath = "/" + path.slice(0, idx + 1).join("/");

            return (
              <li key={idx} className="flex items-center">
                {!isLast ? (
                  <a
                    href="#"
                    className="hover:text-blue-600 cursor-pointer flex items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(fullPath);
                    }}
                  >
                    {segment}
                  </a>
                ) : (
                  <span className="text-gray-500">{segment}</span>
                )}
                {!isLast && (
                  <IoIosArrowForward className="mx-2 text-gray-400" />
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <input
          type="text"
          className="w-full border-none outline-none text-gray-800 text-lg bg-transparent"
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setEditing(false)}
        />
      )}
    </nav>
  );
}
