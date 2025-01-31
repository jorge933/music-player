import { useCallback, useState } from "react";
import { Toast } from "@/components/Toast/Toast";
import { CreateToastFn } from "./useToastsManager.types";

export function useToastsManager() {
  const [toasts, setToasts] = useState<React.JSX.Element[]>([]);

  const addToast = useCallback<CreateToastFn>((message, type, duration, id) => {
    const toastKey = id ?? Date.now().toString();
    const $toast = <Toast message={message} type={type} key={toastKey} />;

    setToasts((prevToasts) => {
      const haveToastWithSameId = prevToasts.find((toast) => toast.key === id);

      return haveToastWithSameId ? prevToasts : [$toast, ...prevToasts];
    });

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((currentToast) => currentToast.key !== toastKey),
      );
    }, duration);
  }, []);

  return {
    toasts,
    addToast,
  };
}
