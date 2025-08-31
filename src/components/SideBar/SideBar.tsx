import { TreeNode } from "../FileNode/FileNode";
import { useEffect, useState } from "react";
import { SidebarData } from "../../types";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [data, setData] = useState<SidebarData>({ drives: [], shortcuts: [] });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSidebar() {
      try {
        const res = await invoke<SidebarData>("fetch_sidebar_data");
        setData(res);
      } catch (err) {
        console.error("Failed to fetch sidebar data:", err);
      }
    }
    loadSidebar();
  }, []);

  function handleNavigate(path: string) {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
    navigate("/" + cleanedPath); // update router URL
  }

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-3 overflow-y-auto">
      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-3xl shadow">
          <TreeNode label="Shortcuts">
            {data.shortcuts.map((s) => (
              <TreeNode
                key={s.mount_point || s.name}
                label={s.name}
                path={s.mount_point || ""}
                onSelect={handleNavigate}
              />
            ))}
          </TreeNode>
        </div>

        <div className="bg-white p-4 rounded-3xl shadow">
          <TreeNode label="Drives">
            {data.drives.map((d) => (
              <TreeNode
                key={d.name}
                label={`${d.name}`}
                path={d.mount_point}
                onSelect={handleNavigate}
              />
            ))}
          </TreeNode>
        </div>
      </div>
    </aside>
  );
}
