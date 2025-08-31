import React, { useEffect, useState } from "react";
import GooglePhotos from "./components/GooglePhotos";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ContentPage from "./ContentPage";
import Layout from "./Layout";

const GlobalStyle = createGlobalStyle`

  body {
    background-color: white; /* Set the background color */
    font-family: Arial, sans-serif; /* Set a default font */
  }
`;

//

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Layout route */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/googlePhotos" element={<GooglePhotos />} />
          <Route path="/*" element={<ContentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
