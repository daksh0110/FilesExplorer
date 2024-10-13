import styled from "styled-components";
import { useAuth } from "../AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DrivesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  height: fit-content;
  padding: 1rem;
`;
const EachDrive = styled.div`
  cursor: pointer;
  &:hover,
  &focus {
    border: dotted;
  }
  &:active {
    background-color: lightblue;
  }
`;
export default function Drives() {
  const navigate = useNavigate();
  const { drives, Read, setDrives } = useAuth();

  async function handleClick(path) {
    console.log("This is the Drives path " + path);
    navigate("/" + path);
  }
  return (
    <DrivesGrid>
      {drives.map((drive, index) => (
        <EachDrive key={index} onClick={() => handleClick(drive.mount_point)}>
          <h5>{drive.name}</h5>
          <h5>{drive.mount_point}</h5>
          <h5>{Number(drive.available_space) / (1024 * 1024 * 1024)}</h5>
          <h5>{drive.total_space}</h5>
          <h5>{drive.disk_type}</h5>
        </EachDrive>
      ))}
    </DrivesGrid>
  );
}
