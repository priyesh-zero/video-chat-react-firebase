import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { LogoutButton } from "../LogoutButton";
import { UserList } from "../users/UserList";

const topBarVariants = {
  hidden: {
    y: -30,
  },
  show: {
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
};

export const Topbar = () => {
  const [showUserList, setShowUserList] = useState(false);
  return (
    <>
      <motion.div
        variants={topBarVariants}
        initial="hidden"
        animate="show"
        className="d-flex justify-content-between align-items-center"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 30,
          background: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          className="btn btn-sm gradient border-0"
          onClick={() => setShowUserList((prev) => !prev)}
        >
          Users
        </Button>
        <LogoutButton />
      </motion.div>
      <AnimatePresence exitBeforeEnter>
        {showUserList && <UserList />}
      </AnimatePresence>
    </>
  );
};
