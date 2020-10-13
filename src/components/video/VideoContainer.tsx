import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { PeerContext } from "src/providers/contexts/Peer";
import { Video } from "./Video";

export const VideoContainer = React.memo(() => {
  const { streams, addLocalStream } = useContext(PeerContext);
  useEffect(() => {
    const getUserMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { noiseSuppression: true, echoCancellation: true },
      });
      addLocalStream(stream);
    };
    getUserMedia();
  }, []);
  return (
    <Container className="d-flex flex-wrap" fluid>
      {streams.map((stream, index) => (
        <Video
          key={`video-${index}`}
          stream={stream.stream}
          mute={stream.local}
        />
      ))}
    </Container>
  );
});
