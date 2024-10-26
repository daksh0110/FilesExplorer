import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import NavBar from "./components/Navbar";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import styled from "styled-components";

import DataTable from "react-data-table-component";
import NewLayout from "./components/NewLayout";
import RighClickContextMenu from "./components/RightClickContextMenu";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
const FilePaneContainer = styled.div`
  padding: 16px;
  overflow: hidden;
  border-radius: 8px;
  height: inherit;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  /* background-color: #333; */
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
  const { Read, content, currentPath, setCurrentPath } = useAuth();
  // trying context menu

  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function FetchContent() {
      function absolute_path(path) {
        return path.startsWith("/") ? path.slice(1) : path;
      }

      console.log("ContentPage is rendering for path: " + path);
      const finalPath = path === "C:" ? "C:/" : absolute_path(path);
      console.log("Final path for reading content: " + finalPath);

      await Read(finalPath);
    }

    FetchContent();
  }, [path]);
  async function handleClick(path) {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
    navigate("/" + cleanedPath);
    console.log("Path /" + cleanedPath);
  }

  console.log(content);

  // function for context contextmeu

  function contextMenu(e) {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setOpen(true);
  }
  return (
    <>
      <NewLayout>
        <FilePaneContainer
          onContextMenu={(e) => {
            if (typeof document.hasFocus === "function" && !document.hasFocus())
              return;

            e.preventDefault();
            setAnchorPoint({ x: e.clientX, y: e.clientY });
            setOpen(true);
          }}
        >
          <ControlledMenu
            anchorPoint={anchorPoint}
            state={isOpen ? "open" : "closed"}
            direction="right"
            onClose={() => setOpen(false)}
            menuStyle={{}}
          >
            <MenuItem>Cut</MenuItem>
            <MenuItem>Copy</MenuItem>
            <MenuItem>Paste</MenuItem>
          </ControlledMenu>
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
                    onContextMenu={(e) => {
                      contextMenu(e);
                    }}
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
