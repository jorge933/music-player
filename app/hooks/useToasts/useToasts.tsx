import { useState } from "react";
import { Toast } from "@/components/Toast/Toast";
import { CreateToastFn } from "./useToast.types";

export function useToasts() {
  const [toasts, setToasts] = useState<React.JSX.Element[]>([]);

  const addToast: CreateToastFn = (message, type, duration) => {
    const toastKey = Date.now().toString();
    const $toast = <Toast message={message} type={type} key={toastKey} />;

    setToasts((prevToasts) => [$toast, ...prevToasts]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((currentToast) => currentToast.key !== toastKey),
      );
    }, duration);
  };

  return {
    toasts,
    addToast,
  };
}
