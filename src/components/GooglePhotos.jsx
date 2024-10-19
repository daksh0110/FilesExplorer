import { useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/core";
import { useAuth } from "../AuthContext";
import {
  userProfile,
  fetchAlbums,
  fetchAllPhotos,
} from "../components/UserData";
import UserButton from "./userButton";
import styled from "styled-components";
import PhotoBox from "./MediaBox";
import { Layout } from "./Layout";
import NavBar from "./Navbar";
import GooglePhotosIcon from "../Icons/GooglePhotosIcon";
import NewLayout from "./NewLayout";
import { useLocation } from "react-router-dom";

const Background = styled.div`
  /* background-color: #243642; */
  height: 100vh;
  padding: 0;
  width: 100%;
`;
const Header = styled.div`
  background-color: #6c48c5;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
`;
const OuterArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 1rem;
  gap: 1rem;
`;
export default function GooglePhotos() {
  const { isLoggedIn, user, login, logout, setCurrentPath } = useAuth();
  const [photosAlbum, setPhotosAlbum] = useState([]);
  const [allMedia, setAllMedia] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (isLoggedIn && user) {
      console.log(user);
      fetchData();
    }
    setCurrentPath(location.pathname);
  }, [isLoggedIn, user]);
  async function fetchData() {
    setPhotosAlbum((await fetchAlbums(user)) || []);
    setAllMedia(await fetchAllPhotos(user));
  }

  return (
    <>
      {isLoggedIn && (
        // <Layout>
        //   <NavBar />
        //   <Background>
        //     <Header>
        //       <GooglePhotosIcon />

        //       <UserButton />
        //     </Header>
        //     <OuterArea>
        //       {allMedia.map((media, index) => (
        //         <PhotoBox media={media} />
        //       ))}
        //     </OuterArea>
        //   </Background>
        // </Layout>

        <NewLayout></NewLayout>
      )}
      {!isLoggedIn && (
        <div>
          <h1>Please Log in</h1> <button onClick={login}>Login</button>
        </div>
      )}
    </>
  );
}
