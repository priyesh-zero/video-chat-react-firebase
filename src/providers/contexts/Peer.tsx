import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Peer from "peerjs";

interface StreamObj {
  local: boolean;
  stream: MediaStream;
}

interface PeerContextValues {
  peerId: string | null;
  streams: StreamObj[];
  addLocalStream: (stream: MediaStream) => void;
  callPeer: (remotePeerId: string) => void;
}
export const PeerContext = createContext<PeerContextValues>({
  peerId: null,
  streams: [],
  addLocalStream: (_stream) => {},
  callPeer: (_remotePeerId) => {},
});

export const PeerProvider: FC = ({ children }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [streams, setStreams] = useState<StreamObj[]>([]);
  const peer = useRef<Peer | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  const onStream = useCallback(
    (remoteStream: MediaStream) => {
      setStreams((state) => {
        if (!state.some((stream) => stream.stream.id === remoteStream.id)) {
          return [
            ...state,
            { stream: remoteStream, local: false },
          ] as StreamObj[];
        } else {
          return state;
        }
      });
    },
    [setStreams]
  );

  useEffect(() => {
    peer.current = new Peer(undefined, {
      host: process.env.REACT_APP_PEER_SERVER,
      port: +process.env.REACT_APP_PEER_PORT!,
      path: "/",
    });
    peer.current!.on("open", setPeerId);
    peer.current!.on("call", (call) => {
      call.answer(localStream.current || undefined);
      call.on("stream", onStream);
    });
  }, []);

  const callPeer = useCallback((remotePeerId: string) => {
    if (peer.current) {
      const call = peer.current.call(remotePeerId, localStream.current!);
      call.on("stream", onStream);
    }
  }, []);

  const addLocalStream = useCallback(
    (stream: MediaStream) => {
      localStream.current = stream;
      setStreams((state) => [...state, { stream, local: true }]);
    },
    [setStreams]
  );
  return (
    <PeerContext.Provider value={{ peerId, streams, addLocalStream, callPeer }}>
      {children}
    </PeerContext.Provider>
  );
};
