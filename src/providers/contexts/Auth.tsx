import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "firebase";

import { auth } from "src/firebase";
import { ToastContext } from "./Toast";

interface AuthContextValues {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValues>({
  user: null,
  login: async (_email, _password) => {},
  logout: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    let prevUser: User | null;
    const unsubscribe = auth.onAuthStateChanged((newUser) => {
      setUser((state) => {
        prevUser = state;
        return newUser;
      });
      newUser &&
        showToast(
          "success",
          "Login Successfully",
          `Welcome back ${newUser.email}!`,
          newUser.photoURL
        );
      !newUser &&
        prevUser &&
        showToast(
          "success",
          "Logout Successfully",
          `${prevUser.email} logout Successful!`
        );
    });
    return () => {
      unsubscribe();
    };
  }, [setUser, showToast]);

  const login = async (email: string, password: string) => {
    /* Login Logic here */
    await auth.signInWithEmailAndPassword(email, password);
  };

  const logout = async () => {
    /* Logout Logic Here */
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
