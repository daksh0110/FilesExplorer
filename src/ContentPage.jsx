import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import NavBar from "./components/Navbar";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import styled from "styled-components";

import DataTable from "react-data-table-component";
const TableWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledDataTable = styled(DataTable)`
  flex: 1; /* Ensures the table takes up remaining space */
  overflow-y: auto; /* Enables vertical scrolling */
`;
export default function ContentPage() {
  const { "*": path } = useParams();
  const navigate = useNavigate();
  const { Read, content } = useAuth();

  const [selectedRows, setSelectedRows] = useState([]);

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
    // createTable();
  }, [path]);
  async function handleClick(path) {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
    navigate("/" + cleanedPath);
    console.log("Path /" + cleanedPath);
  }

  //   async function createTable() {
  //     const tableData = await content.map((each, index) => ({
  //       id: index,
  //       Name: each.name,
  //       Type: each.file_type,
  //       path: each.path,
  //     }));
  //     setData(tableData); // Set the new data in state
  //   }

  let columns = [
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "file_type",
      selector: (row) => row.file_type,
      sortable: true,
    },
  ];

  //   data = [
  //     {
  //       id: 1,
  //       Name: "Beetlejuice",
  //       year: "1988",
  //     },
  //     {
  //       id: 2,
  //       title: "Ghostbusters",
  //       year: "1984",
  //     },
  //   ];

  function handleRowClick(row) {
    handleClick(row.path);
  }
  console.log(content);
  return (
    <Layout>
      <NavBar />
      <TableWrapper>
        <StyledDataTable
          columns={columns}
          data={content}
          highlightOnHover
          pointerOnHover
          selectableRows
          onRowClicked={handleRowClick}
        />
      </TableWrapper>
    </Layout>

    //
  );
}
