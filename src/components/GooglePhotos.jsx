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
const Background = styled.div`
  background-color: #243642;
  height: 100vh;
  padding: 0;
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
  const { isLoggedIn, user, login, logout } = useAuth();
  const [photosAlbum, setPhotosAlbum] = useState([]);
  const [allMedia, setAllMedia] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      console.log(user);
      fetchData();
    }
  }, [isLoggedIn, user]);
  async function fetchData() {
    setPhotosAlbum((await fetchAlbums(user)) || []);
    setAllMedia(await fetchAllPhotos(user));
  }

  return (
    <>
      {isLoggedIn && (
        <div>
          <Header>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="70"
              height="70"
              viewBox="0 0 48 48"
            >
              <path
                fill="#f44336"
                d="M37,24h-6.936C26.715,24,24,21.285,24,17.936V0.573c0-0.219,0.26-0.333,0.421-0.184L37,12V24z"
              ></path>
              <path
                fill="#ad1457"
                d="M37,24h-6.936c-1.436,0-2.755-0.499-3.794-1.333L37,12V24z"
              ></path>
              <path
                fill="#8bc34a"
                d="M11,24h6.936C21.285,24,24,26.715,24,30.064v17.362c0,0.219-0.26,0.333-0.421,0.184L11,36V24z"
              ></path>
              <path
                fill="#009688"
                d="M11,24h6.936c1.436,0,2.755,0.499,3.794,1.333L11,36V24z"
              ></path>
              <path
                fill="#ffc107"
                d="M24,11v6.936C24,21.285,21.285,24,17.936,24H0.573c-0.219,0-0.333-0.26-0.184-0.421L12,11H24z"
              ></path>
              <path
                fill="#ff9800"
                d="M24,11v6.936c0,1.436-0.499,2.755-1.333,3.794L12,11H24z"
              ></path>
              <path
                fill="#448aff"
                d="M24,37v-6.936C24,26.715,26.715,24,30.064,24h17.362c0.219,0,0.333,0.26,0.184,0.421L36,37H24z"
              ></path>
              <path
                fill="#1565c0"
                d="M24,37v-6.936c0-1.436,0.499-2.755,1.333-3.794L36,37H24z"
              ></path>
            </svg>
            {/* {photosAlbum.map((album, index) => (
            <div key={index}>
              <h5>Album {index}</h5>
              <img src={album.coverPhotoBaseUrl} />
            </div>
          ))} */}
            <UserButton />
          </Header>
          <OuterArea>
            {allMedia.map((media, index) => (
              <PhotoBox media={media} />
            ))}
          </OuterArea>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <h1>Please Log in</h1> <button onClick={login}>Login</button>
        </div>
      )}
    </>
  );
}
