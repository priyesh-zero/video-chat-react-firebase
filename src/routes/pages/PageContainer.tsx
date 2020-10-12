import { motion } from "framer-motion";
import React, { FC } from "react";
import { routeVariant } from "src/framer-variants/routes";

export const PageContainer: FC = ({ children }) => {
  return (
    <motion.div
      variants={routeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-container"
    >
      {children}
    </motion.div>
  );
};
