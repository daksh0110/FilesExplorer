import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import NavBar from "./components/Navbar";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import styled from "styled-components";

const ContentLayout = styled.div`
  margin: 15px;
`;
const Entry = styled.div`
  display: flex;
  gap: 100px;
`;
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
      const finalPath = path === "C:" ? "C:/" : absolute_path(path); // Prepare final path
      console.log("Final path for reading content: " + finalPath);
      await Read(finalPath); // Fetch content based on the processed path
    }

    FetchContent();
  }, [path]); // Re-fetch content when path changes
  async function handleClick(path) {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
    navigate("/" + cleanedPath);
    console.log("Path /" + cleanedPath);
  }
  console.log(content);
  return (
    <Layout>
      <NavBar />
      <ContentLayout>
        {content.map((con) => (
          <Entry onClick={() => handleClick(con.path)}>
            <h6>{con.name}</h6>
            <h6>{con.path}</h6>
          </Entry>
        ))}
      </ContentLayout>
    </Layout>

    //
  );
}
