import React from "react";
import styled from "styled-components";
import "../../src/TreeviewCSS.css";
import { useNavigate } from "react-router-dom";

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
`;
const SideBarMenu = ({ name, subMenuName = [], icon }) => {
  const navigate = useNavigate();
  return (
    <MenuBox>
      {name}
      <MenuItem>
        {subMenuName.map((item) => (
          <SubMenuItem key={item} onClick={() => navigate(item.mount_point)}>
            {icon}
            {item.name}
          </SubMenuItem>
        ))}
      </MenuItem>
    </MenuBox>
  );
};

export default SideBarMenu;
