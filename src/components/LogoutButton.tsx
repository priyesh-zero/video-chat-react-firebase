import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "src/providers/contexts/Auth";

export const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Button className="btn btn-sm gradient border-0" onClick={logout}>
      Logout
    </Button>
  );
};
