import { User } from "firebase";
import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useBeforeunload } from "react-beforeunload";
import { useAuthState } from "react-firebase-hooks/auth";
import { Status } from "src/enum/status";
import { auth, firestore } from "src/firebase";
import { ToastContext } from "./Toast";

interface AuthContextValues {
  user?: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValues>({
  user: undefined,
  login: async (_email, _password) => {},
  logout: async () => {},
});

type SetUserData = (user: User, status: Status) => void;

const setUserData: SetUserData = (user, status) => {
  firestore.doc(`users/${user.uid}`).set({
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    status: status,
  });
};

export const AuthProvider: FC = ({ children }) => {
  const [user, , error] = useAuthState(auth);
  const { showToast } = useContext(ToastContext);
  const prevUser = useRef(user);

  const unloadUser = useCallback(() => {
    if (user) {
      setUserData(user, Status.INACTIVE);
    }
  }, [user]);

  useBeforeunload(unloadUser);

  useEffect(() => {
    if (user) {
      showToast(
        "success",
        "Login Successfully",
        `Welcome back ${user.email}!`,
        user.photoURL
      );
      setUserData(user, Status.ACTIVE);
    }
    if (prevUser.current && !user) {
      showToast(
        "success",
        "Logout Successfully",
        `${prevUser.current.email} logout Successful!`
      );
      setUserData(prevUser.current, Status.INACTIVE);
    }
    if (error) {
      showToast("danger", "Something went wrong", error.message);
    }
    prevUser.current = user;
    return () => {
      if (user) {
        setUserData(user, Status.INACTIVE);
      }
    };
  }, [user, showToast, error]);

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

/* let prevUser: User | null; */
/*     const unsubscribe = auth.onAuthStateChanged((newUser) => { */
/*       setUser((state) => { */
/*         prevUser = state; */
/*         return newUser; */
/*       }); */
/*       newUser && */
/*         showToast( */
/*           "success", */
/*           "Login Successfully", */
/*           `Welcome back ${newUser.email}!`, */
/*           newUser.photoURL */
/*         ); */
/*       !newUser && */
/*         prevUser && */
/*         showToast( */
/*           "success", */
/*           "Logout Successfully", */
/*           `${prevUser.email} logout Successful!` */
/*         ); */
/*     }); */
/*     return () => { */
/*       unsubscribe(); */
/*     }; */
