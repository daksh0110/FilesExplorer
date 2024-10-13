import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import NavBar from "./components/Navbar";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import styled from "styled-components";

const ContentLayout = styled.div`
  width: 100%;

  max-height: 100vh;
  overflow-y: auto;
`;
const Entry = styled.div`
  display: flex;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: blue;
`;

const TableRow = styled.tr`
  color: green;
  background-color: lightgray;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
`;

const TableHead = styled.th`
  text-align: left;
  padding: 10px;
  color: white;
  background-color: blue;
  border-bottom: 2px solid white;
`;

const TableData = styled.td`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
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
  return (
    <Layout>
      <NavBar />
      <ContentLayout>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {content.map((con, index) => (
              <TableRow key={index} onClick={() => handleClick(con.path)}>
                <TableData>{con.name}</TableData>
                <TableData>{con.file_type}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ContentLayout>
    </Layout>

    //
  );
}
