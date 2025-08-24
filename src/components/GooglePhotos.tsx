import { useEffect, useState } from "react";

import { useAuth } from "../AuthContext";
import { fetchAlbums, fetchAllPhotos } from "./UserData";

import styled from "styled-components";

import NewLayout from "./NewLayout";
import { useLocation } from "react-router-dom";
import PhotoBox from "./MediaBox";

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2rem;

  gap: 2rem;
  button {
    width: 25%;
    height: 40px;
    border-radius: 20px;
  }
`;
export default function GooglePhotos() {
  const { isLoggedIn, user, login, logout, setCurrentPath } = useAuth();
  const [photosAlbum, setPhotosAlbum] = useState([]);
  const [allMedia, setAllMedia] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchData();
    }
    setCurrentPath(location.pathname);
  }, [isLoggedIn, user]);
  async function fetchData() {
    if (!user) return;
    setPhotosAlbum((await fetchAlbums(user)) || []);
    setAllMedia(await fetchAllPhotos(user));
  }

  return (
    <>
      {isLoggedIn && (
        <NewLayout>
          {allMedia?.map((media, index) => (
            <PhotoBox media={media} />
          ))}
        </NewLayout>
      )}
      {!isLoggedIn && (
        <NewLayout>
          <LoginArea>
            <h1>Please Log in</h1> <button onClick={login}>Login</button>
          </LoginArea>
        </NewLayout>
      )}
    </>
  );
}
