import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  ControlledMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import { useAuth } from "../AuthContext";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";
import { RightClickContextMenuProps } from "../types";

export default function RighClickContextMenu({
  anchorPoint,
  isOpen,
  setOpen,
  path,
  selectedType,
  entryPath,
  name,
}: RightClickContextMenuProps) {
  const navigate = useNavigate();
  const { FetchContent, handleDelete, ReadFile, CopyFile, Paste } = useAuth();
  async function handleCreate() {
    const res = await invoke("createfolder", {
      path: path,
      name: "NewFolder",
      selectedType,
    });
    FetchContent(path);
  }

  function handleOpen() {
    if (selectedType === "directory") {
      const cleanedPath = entryPath.startsWith("/")
        ? entryPath.slice(1)
        : entryPath;
      navigate("/" + cleanedPath);
    } else {
      ReadFile(entryPath);
    }
  }

  async function handleDeleteAndRefresh() {
    await handleDelete(entryPath, selectedType);
    await FetchContent(path);
  }

  async function handlePaste(path: string) {
    await Paste(path);
    FetchContent(path);
  }
  return (
    <>
      {(selectedType === "directory" || selectedType === "file") && (
        <ControlledMenu
          anchorPoint={anchorPoint}
          state={isOpen ? "open" : "closed"}
          direction="right"
          onClose={() => setOpen(false)}
          menuStyle={{}}
        >
          <MenuItem onClick={() => handleOpen()}>Open</MenuItem>
          <MenuItem onClick={() => CopyFile(entryPath, name)}>Copy</MenuItem>
          <MenuItem onClick={handleDeleteAndRefresh}>Delete</MenuItem>
        </ControlledMenu>
      )}

      {selectedType === "empty-space" && (
        <ControlledMenu
          anchorPoint={anchorPoint}
          state={isOpen ? "open" : "closed"}
          direction="right"
          onClose={() => setOpen(false)}
          menuStyle={{}}
        >
          <SubMenu label="Create">
            <MenuItem onClick={() => handleCreate()}>Folder</MenuItem>
          </SubMenu>
          <MenuItem onClick={() => handlePaste(path)}>Paste</MenuItem>
        </ControlledMenu>
      )}
    </>
  );
}
