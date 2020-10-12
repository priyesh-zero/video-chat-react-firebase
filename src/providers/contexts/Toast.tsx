import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, FC, useCallback, useState } from "react";
import Toast from "react-bootstrap/Toast";
import { v4 } from "uuid";

type ToastType = "success" | "danger" | "info" | "warn";

type ShowToastFunc = (
  type: ToastType,
  title: string,
  message: string,
  image?: string | null
) => void;

interface Toast {
  id: string;
  type: ToastType;
  image: string | null;
  title: string;
  message: string;
}

interface ToastContextValues {
  showToast: ShowToastFunc;
}

export const ToastContext = createContext<ToastContextValues>({
  showToast: (_type, _title, _message, _image) => {},
});

export const ToastProvider: FC = ({ children }) => {
  const [toastList, setToastList] = useState<Toast[]>([]);

  const showToast: ShowToastFunc = useCallback(
    (type, title, message, image = null) => {
      setToastList(
        (state) =>
          [...state, { id: v4(), image, title, message, type }] as Toast[]
      );
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "absolute",
          padding: 10,
          top: 0,
          right: 0,
        }}
      >
        <AnimatePresence>
          {toastList.map((toast) => (
            <motion.div
              className="m-1"
              key={toast.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <Toast
                className={`p-0 bg-${toast.type}`}
                animation={false}
                onClose={() =>
                  setToastList([
                    ...toastList.filter((tl) => tl.id !== toast.id),
                  ])
                }
                delay={3000}
                autohide
              >
                <Toast.Header className={`bg-${toast.type} text-white`}>
                  {toast.image && (
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded mr-2"
                      alt=""
                    />
                  )}
                  <strong className="mr-auto">{toast.title}</strong>
                  <small>just now</small>
                </Toast.Header>
                <Toast.Body className={`bg-${toast.type} text-white`}>
                  {toast.message}
                </Toast.Body>
              </Toast>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
