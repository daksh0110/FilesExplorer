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

export default function RighClickContextMenu({
  anchorPoint,
  isOpen,
  setOpen,
  path,
}) {
  const { FetchContent } = useAuth();
  async function handleCreate() {
    console.log(path);
    const res = await invoke("createfolder", { path: path, name: "daksh" });
    console.log(res);
    FetchContent(path);
  }

  return (
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
      <MenuItem>Cut</MenuItem>
      <MenuItem>Copy</MenuItem>
      <MenuItem>Paste</MenuItem>
    </ControlledMenu>
  );
}
