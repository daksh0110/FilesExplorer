import React, { useEffect, useState } from "react";
import GooglePhotos from "./components/GooglePhotos";
import styled, { createGlobalStyle } from "styled-components";

import Home from "./Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentPage from "./ContentPage";

import { useAuth } from "./AuthContext";
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: white; /* Set the background color */
    font-family: Arial, sans-serif; /* Set a default font */
  }
`;

//

function App() {
  const { currentPath, setCurrentPath } = useAuth();
  return (
    <div>
      <Router>
        <div>
          <GlobalStyle />
        </div>

        <Routes>
          <Route path="/Home" element={<Home />} Route />
          <Route path="/*" element={<ContentPage />} />
          <Route path="/googlePhotos" element={<GooglePhotos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
