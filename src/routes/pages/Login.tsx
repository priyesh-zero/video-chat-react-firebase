import React, { FormEvent, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as yup from "yup";

import { Button } from "react-bootstrap";
import { PageContainer } from "./PageContainer";
import { useHistory } from "react-router";
import { AuthContext } from "src/providers/contexts/Auth";

const cardVariants = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

interface UserCred {
  email: string;
  password: string;
}

type HandleLogin = (userCred: UserCred) => Promise<void>;

export const LoginPage = () => {
  const { user, login } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    user && history.push("/");
  }, [user, history]);

  const handleLogin: HandleLogin = async ({ email, password }) => {
    await login(email, password);
    history.push("/");
  };

  return (
    <PageContainer>
      <motion.div variants={cardVariants} initial="initial" animate="animate">
        <Card style={{ maxWidth: "300px" }}>
          {/* <Card.Header>Login</Card.Header> */}
          <Card.Body>
            <div className="h3 text-center">Login</div>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleLogin}
              validationSchema={loginValidationSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form
                  onSubmit={(e) => {
                    handleSubmit(e as FormEvent<HTMLFormElement>);
                  }}
                >
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="text"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {touched.email && errors.email ? (
                      <p className="text-danger text-capitalize">
                        {errors.email}
                      </p>
                    ) : null}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="text"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {touched.password && errors.password ? (
                      <p className="text-danger text-capitalize">
                        {errors.password}
                      </p>
                    ) : null}
                  </Form.Group>
                  <Button
                    className="w-100 btn gradient border-0"
                    disabled={isSubmitting}
                    type="submit"
                    variant="primary"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </motion.div>
    </PageContainer>
  );
};
