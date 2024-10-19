import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import NavBar from "./components/Navbar";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import styled from "styled-components";

import DataTable from "react-data-table-component";
import NewLayout from "./components/NewLayout";

export default function ContentPage() {
  const { "*": path } = useParams();
  const navigate = useNavigate();
  const { Read, content } = useAuth();

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

  function handleRowClick(row) {
    handleClick(row.path);
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.file_type,
      sortable: true,
    },
  ];
  return (
    <>
      <NewLayout>
        <DataTable columns={columns} data={content} />
      </NewLayout>
    </>
  );
}
