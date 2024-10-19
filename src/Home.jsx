import { invoke } from "@tauri-apps/api/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Drives from "./components/Drives";
import NewLayout from "./components/NewLayout";

export default function Home() {
  return (
    <NewLayout>
      <Drives />
    </NewLayout>
    // <Layout>
    //   <NavBar />

    //   <Drives />
    // </Layout>
  );
}
