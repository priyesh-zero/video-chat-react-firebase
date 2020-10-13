import React, { FC } from "react";

interface VideoProps {
  stream: MediaStream;
  mute: boolean;
}

export const Video: FC<VideoProps> = React.memo(({ stream, mute }) => {
  return (
    <div className="m-auto">
      <video
        autoPlay
        style={mute ? { width: 640, height: 320 } : {}}
        muted={mute}
        ref={(ref) => {
          if (ref) ref.srcObject = stream;
        }}
      />
    </div>
  );
});
