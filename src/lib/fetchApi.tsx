import axios from "axios";

// get tracks being searched
const getTracks = async (token: string, searchParam: any) => {
  const url = "https://api.spotify.com/v1/search";
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: searchParam,
      type: "track",
      limit: 12,
    },
  });
  return response.data.tracks.items;
};

// create playlist
const createPlaylist = async (title: string, description: string, token: string, profile: any) => {
  const url = `https://api.spotify.com/v1/users/${profile.id}/playlists`;
  const response = await axios.post(
    url,
    {
      name: title,
      description: description,
      public: false,
      collaborative: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.id;
};

// add selected songs to created playlist
const addToPlaylist = async (playlistId: string, token: string, selectedTracks: any) => {
  const uris = selectedTracks;
  const trackData = JSON.stringify({ uris });
  const response = await axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      trackData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
};

// get user data
const getUser = async (token: string) => {
  const url = "https://api.spotify.com/v1/me";
  const datas = await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
    return datas;
};


export { getTracks, createPlaylist, addToPlaylist, getUser };
