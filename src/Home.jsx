import { invoke } from "@tauri-apps/api/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Drives from "./components/Drives";

export default function Home() {
  //   const [content, setContent] = useState([]);
  //   const navigate = useNavigate();

  return (
    <Layout>
      <NavBar />

      <Drives />
    </Layout>
  );
}
