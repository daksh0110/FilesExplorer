import axios from "axios";

export async function userProfile(user) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );

    return res.data;
  } catch (error) {}
}

export async function fetchAlbums(user) {
  try {
    const res = await axios.get(
      "https://photoslibrary.googleapis.com/v1/albums",
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      }
    );

    return res.data.albums;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
}
export async function fetchAllPhotos(user) {
  let nextPageToken = null;
  try {
    const res = await axios.get(
      "https://photoslibrary.googleapis.com/v1/mediaItems",
      {
        headers: {
          Authorization: `Bearer ${user}`,
        },
        params: {
          pageSize: 100,
        },
      }
    );

    return res.data.mediaItems;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
}
