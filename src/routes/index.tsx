import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";

export const Routes = () => {
  return (
    <Router>
      <SwitchRoutes />
    </Router>
  );
};

const SwitchRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>{" "}
    </AnimatePresence>
  );
};
