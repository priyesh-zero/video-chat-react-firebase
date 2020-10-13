import React from "react";
import { Topbar } from "src/components/topbar/TopBar";
import { VideoContainer } from "src/components/video/VideoContainer";
import { PageContainer } from "./PageContainer";

export const HomePage = () => {
  return (
    <PageContainer>
      <Topbar />
      <VideoContainer />
    </PageContainer>
  );
};
