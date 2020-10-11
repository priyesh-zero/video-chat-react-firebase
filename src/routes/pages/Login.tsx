import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { routeVariant } from "src/framer-variants/routes";

export const LoginPage = () => {
  return (
    <motion.div
      variants={routeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-container"
    >
      <Link to="/">Home Page</Link>
    </motion.div>
  );
};
