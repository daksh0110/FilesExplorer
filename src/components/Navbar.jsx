import styled from "styled-components";
import { useAuth } from "../AuthContext";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "../Home";

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const { drives, Read } = useAuth();
  const navigate = useNavigate();

  async function handleClick(path) {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
    navigate("/" + cleanedPath);
    console.log("Path /" + cleanedPath);
  }
  return (
    <Sidebar
      width="250px"
      backgroundColor="red"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "gray",
          height: "100vh",
          border: "none",
        },
      }}
    >
      <Menu>
        <SubMenu label="Web">
          <MenuItem onClick={() => navigate("/googlePhotos")}>
            Google Photos{" "}
          </MenuItem>
        </SubMenu>
        <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
        <SubMenu label="Disks">
          {drives.map((drive) => (
            <MenuItem
              key={drive.mount_point} // Add key prop
              onClick={() => {
                handleClick(drive.mount_point);
              }}
            >
              {drive.name} ({drive.mount_point})
            </MenuItem>
          ))}
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}
