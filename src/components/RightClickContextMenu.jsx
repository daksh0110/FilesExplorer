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

export default function RighClickContextMenu({
  anchorPoint,
  isOpen,
  setOpen,
  path,
  selectedType,
  entryPath,
}) {
  const navigate = useNavigate();
  const { FetchContent, handleDelete, ReadFile } = useAuth();
  async function handleCreate() {
    console.log(path);
    const res = await invoke("createfolder", {
      path: path,
      name: "NewFolder",
      selectedType,
    });
    console.log(res);
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

          <MenuItem
            onClick={() => {
              handleDelete(entryPath, selectedType);
              FetchContent(path);
            }}
          >
            Delete
          </MenuItem>
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
        </ControlledMenu>
      )}
    </>
  );
}
