import React, { FC } from "react";
import { AuthProvider } from "./contexts/Auth";
import { ToastProvider } from "./contexts/Toast";

export const RootProvider: FC = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
};
