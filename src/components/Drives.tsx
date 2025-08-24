import styled from "styled-components";
import { useAuth } from "../AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drive } from "../types";

const DrivesGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  height: fit-content;
  width: fit-content;
`;
const EachDrive = styled.div`
  padding: 5px;
  width: max-content;

  cursor: pointer;
  &:hover,
  &focus {
    border: dotted;
  }
  &:active {
    background-color: lightblue;
  }
`;
const DrivesHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const DrivesHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  width: 50%;
  margin: 0 auto;
  padding-bottom: 4px;
  font-size: large;
  letter-spacing: 2px;
`;
const ProgressBar = styled.progress`
  height: 20px;
  border-radius: 0;
  &::-webkit-progress-bar {
    background-color: #e0e0e0;
    border-radius: 0;
  }
  &::-webkit-progress-value {
    background-color: #1c64f2;
    border-radius: 0;
  }
  &::-moz-progress-bar {
    background-color: #1c64f2;
    border-radius: 0;
  }
`;

export default function Drives() {
  const navigate = useNavigate();
  const { drives } = useAuth() as { drives: Drive[] };

  async function handleClick(path: string) {
    console.log("This is the Drives path " + path);

    navigate("/" + path);
  }
  useEffect(() => {
    console.log(drives);
  }, [drives]);

  function conversion(number: number | string) {
    return Math.trunc(Number(number) / (1024 * 1024 * 1024));
  }

  return (
    <DrivesHeader>
      <DrivesHeading> All Drives</DrivesHeading>

      <DrivesGrid>
        {drives.map((drive, index) => (
          <EachDrive key={index} onClick={() => handleClick(drive.mount_point)}>
            <h5>
              {drive.name} ({drive.disk_type})
            </h5>
            <h5>{drive.mount_point}</h5>
            <ProgressBar
              value={
                conversion(drive.total_space) -
                conversion(drive.available_space)
              }
              max={Number(drive.total_space) / (1024 * 1024 * 1024)}
            />
            <h5>
              {conversion(drive.available_space)} GB free of{" "}
              {conversion(drive.total_space)} GB
            </h5>
          </EachDrive>
        ))}
      </DrivesGrid>
    </DrivesHeader>
  );
}
