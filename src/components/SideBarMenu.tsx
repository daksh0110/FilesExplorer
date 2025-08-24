import React from "react";
import styled from "styled-components";
import "../../src/TreeviewCSS.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { SideBarMenuProps } from "../types";

const MenuBox = styled.div`
  background-color: white;
  height: fit-content;
  padding: 0.7rem;
  border-radius: 10px;
`;
const MenuItem = styled.div`
  padding-left: 1rem;
`;
const SubMenuItem = styled.div`
  padding-top: 0.3rem;
  display: flex;
  gap: 7px;
  cursor: pointer;
  height: 20px;
  border-radius: 10px;
  user-select: none;
`;
const SideBarMenu: React.FC<SideBarMenuProps> = ({
  name,
  subMenu = [],
  icon,
}) => {
  const navigate = useNavigate();
  const { setCurrentPath } = useAuth();
  function handleClick(path: string) {
    if (!path.startsWith("/")) {
      navigate("/" + path, { replace: true });
    } else {
      setCurrentPath(path);
      navigate(path);
    }
  }
  return (
    <MenuBox>
      {name}
      <MenuItem>
        {subMenu.map((item, index) => (
          <SubMenuItem
            key={index}
            onClick={() => handleClick(item.mount_point)}
          >
            {item?.icon}
            {item.name}
          </SubMenuItem>
        ))}
      </MenuItem>
    </MenuBox>
  );
};

export default SideBarMenu;
