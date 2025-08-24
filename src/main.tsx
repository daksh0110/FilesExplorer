import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./AuthContext";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App";
const theme = createTheme({
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  primaryColor: "blue",
  defaultRadius: "md",
  fontFamily: "Inter, system-ui, sans-serif",
  headings: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
  components: {
    Paper: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    },
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <GoogleOAuthProvider clientId="516272667730-ve66nor0keaipt0scmpj9hs8oq47egrn.apps.googleusercontent.com">
    <AuthProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications position="top-right" />
        <App />
      </MantineProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
