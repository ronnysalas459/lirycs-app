import React, { createContext, useState, useEffect } from "react";
import { chartTracksGet, trackSearch } from "./../constants";

// creation context
export const SongsContext = createContext();

const SongsContextProvider = ({ children }) => {
  const [doneFetch, setDoneFetch] = useState();
  const [currentQtrack, setCurrentQTrack] = useState("");
  const [text, setText] = useState("Top Songs In US");
  const [tracks, setTracks] = useState([]);

  // life cycle hooks - you can define all the useEffect that you wont 
  useEffect(() => {
    getTopTracks();
  }, []);

  const getTopTracks = () => {
    fetch(chartTracksGet())
      .then((res) => res.json())
      .then((data) => {
        setDoneFetch(true);
        setTracks(data.message.body.track_list);
      })
      .catch((err) => console.log(err));
  };

  const getTracks = (q_track) => {
    fetch(trackSearch(q_track))
      .then((res) => res.json())
      .then((data) => {
        const { track_list } = data.message.body;
        setDoneFetch(true);
        setText(track_list.length ? "Results" : "No Results");
        setTracks(track_list);
      })
      .catch((err) => console.log(err));
  };

  const validateQTrack = (
    e,
    q_track = document.querySelector("#q_track").value.toLowerCase().trim()
  ) => {
    if (e.type === "keypress" && e.key !== "Enter") return;
    const words = q_track.match(/\w+/g);
    q_track = words && words.join(" ");
    if (q_track && q_track !== currentQtrack) {
      setCurrentQTrack(q_track);
      setDoneFetch(false);
      getTracks(q_track);
    }
  };

  // pattern design: Provider
  // value: all the props used for children component inside the HOC
  return (
    <SongsContext.Provider value={{ doneFetch, text, tracks, validateQTrack }}>
      {children}
    </SongsContext.Provider>
  );
};

export default SongsContextProvider;
