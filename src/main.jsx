import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="516272667730-ve66nor0keaipt0scmpj9hs8oq47egrn.apps.googleusercontent.com">
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);
