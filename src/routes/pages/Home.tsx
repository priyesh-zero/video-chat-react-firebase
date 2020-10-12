import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Status } from "src/enum/status";
import { firestore } from "src/firebase";
import { UserClaims } from "src/interfaces/UserClaims";

import { AuthContext } from "src/providers/contexts/Auth";
import { ToastContext } from "src/providers/contexts/Toast";
import { PageContainer } from "./PageContainer";

export const HomePage = () => {
  const { logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [users, loading, errors] = useCollectionData<UserClaims>(
    firestore.collection("users")
  );

  if (errors) {
    showToast("danger", "Something went wrong", errors.message);
  }

  return (
    <PageContainer>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Card style={{ width: "18rem" }}>
            <ListGroup variant="flush">
              {users?.map((user) => (
                <ListGroup.Item
                  className={`${
                    parseInt(user.status) === Status.ACTIVE
                      ? "bg-success border-success"
                      : "bg-secondary border-secondary"
                  } text-white`}
                >
                  {user.displayName || user.email}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          <Button className="btn gradient border-0" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </PageContainer>
  );
};
