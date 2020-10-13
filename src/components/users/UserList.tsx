import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Status } from "src/enum/status";
import { firestore } from "src/firebase";
import { UserClaims } from "src/interfaces/UserClaims";
import { PeerContext } from "src/providers/contexts/Peer";
import { ToastContext } from "src/providers/contexts/Toast";

const listVariant = {
  show: {
    y: 0,
    transition: {
      duration: 1,
    },
  },
  hidden: {
    y: "-100vh",
    transition: {
      duration: 1,
    },
  },
};

export const UserList = () => {
  const { showToast } = useContext(ToastContext);
  const { callPeer } = useContext(PeerContext);

  const [users, loading, errors] = useCollectionData<UserClaims>(
    firestore.collection("users")
  );

  if (errors) {
    showToast("danger", "Something went wrong", errors.message);
  }

  return (
    <motion.div
      variants={listVariant}
      initial="hidden"
      animate="show"
      exit="hidden"
      style={{ position: "absolute", top: 35, bottom: 35, left: 10 }}
    >
      {loading ? (
        <h5>Loading Users...</h5>
      ) : (
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            {users?.map((user) => (
              <ListGroup.Item
                key={user.email}
                onClick={() => callPeer(user.peerId)}
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
      )}
    </motion.div>
  );
};
