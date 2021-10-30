import React, { useContext } from "react";
import { LyricsContext } from "../../contexts/LyricsContext";
import ProgressBar from "./../Common/ProgressBar";
import Message from "./../Common/Message";
import ButtonPrimary from "./../Common/ButtonPrimary";
import Details from "./Details";

const Lyrics = () => {
  const { doneFetchTrack, doneFetchLyrics, track, lyrics } =
    useContext(LyricsContext);
  return (
    <>
      {doneFetchTrack && doneFetchLyrics ? (
        !Array.isArray(track) && !Array.isArray(lyrics) ? (
          <Details track={track} lyrics={lyrics} />
        ) : (
          <Message text="No Results" />
        )
      ) : (
        <ProgressBar />
      )}
      <ButtonPrimary type="back" to="/" />
    </>
  );
};

export default Lyrics;
