import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NewLayout from "./components/NewLayout";
import RighClickContextMenu from "./components/RightClickContextMenu";
import { useAuth } from "./AuthContext";

const FilePaneContainer = styled.div`
  padding: 16px;
  overflow: hidden;
  border-radius: 8px;
  height: 100%;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  color: black;
  padding: 10px;
  text-align: left;
  border: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  user-select: none;
`;

const FileIcon = styled.span`
  margin-right: 10px;
`;

export default function ContentPage() {
  const { "*": path } = useParams();
  const navigate = useNavigate();
  const { FetchContent, content } = useAuth();

  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [selectedType, setSelectedType] = useState(null);
  const [entryPath, setEntryPath] = useState(null);

  useEffect(() => {
    FetchContent(path);
  }, [path]);

  const handleClick = (path) => {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
    navigate("/" + cleanedPath);
  };

  const handleContextMenu = (e, type, entrypath) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setSelectedType(type);
    setEntryPath(entrypath);
    console.log(entrypath);
    setTimeout(() => setOpen(true), 10);
  };

  return (
    <>
      <NewLayout>
        <RighClickContextMenu
          anchorPoint={anchorPoint}
          isOpen={isOpen}
          setOpen={setOpen}
          path={path}
          selectedType={selectedType}
          entryPath={entryPath}
        />
        <FilePaneContainer
          onContextMenu={(e) => {
            e.preventDefault();
            if (!isOpen) {
              handleContextMenu(e, "empty-space");
            }
          }}
        >
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Size</TableHeader>
                <TableHeader>Date Modified</TableHeader>
              </tr>
            </thead>
            <tbody>
              {content.map((entry, index) => (
                <TableRow key={index}>
                  <TableData
                    onDoubleClick={() => handleClick(entry.path)}
                    onContextMenu={(e) =>
                      handleContextMenu(
                        e,
                        entry.file_type === "Directory" ? "directory" : "file",
                        entry.path
                      )
                    }
                  >
                    {entry.file_type === "Directory" ? (
                      <FileIcon>📁</FileIcon>
                    ) : (
                      <FileIcon>📄</FileIcon>
                    )}{" "}
                    {entry.name}
                  </TableData>
                  <TableData>{entry.file_type}</TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </FilePaneContainer>
      </NewLayout>
    </>
  );
}
