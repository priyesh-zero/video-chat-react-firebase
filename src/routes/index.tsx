import { AnimatePresence } from "framer-motion";
import React, { FC, useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "src/providers/contexts/Auth";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { PageContainer } from "./pages/PageContainer";

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
    <>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>{" "}
      </AnimatePresence>
    </>
  );
};

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <PageContainer>
            <Redirect to="/login" />
          </PageContainer>
        )
      }
    />
  );
};
