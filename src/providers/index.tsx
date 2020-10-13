import React, { FC } from "react";
import { AuthProvider } from "./contexts/Auth";
import { PeerProvider } from "./contexts/Peer";
import { ToastProvider } from "./contexts/Toast";

export const RootProvider: FC = ({ children }) => {
  return (
    <ToastProvider>
      <PeerProvider>
        <AuthProvider>{children}</AuthProvider>
      </PeerProvider>
    </ToastProvider>
  );
};
