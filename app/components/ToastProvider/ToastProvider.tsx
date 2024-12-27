import { ToastContext } from "@/contexts/toastContext/toastContext";
import {
  ToastFunctions,
  ToastTypes,
} from "@/contexts/toastContext/toastContext.types";
import { useToasts } from "@/hooks/useToasts/useToasts";
import { ReactNode, useMemo } from "react";
import { YStack } from "tamagui";

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast } = useToasts();
  const types: ToastTypes[] = ["error", "info", "success"];

  const toastActions: ToastFunctions = useMemo(
    () =>
      types.reduce((prev, type) => {
        prev[type] = (message, duration) => addToast(message, type, duration);

        return prev;
      }, {} as ToastFunctions),
    [addToast],
  );

  return (
    <ToastContext.Provider value={toastActions}>
      <YStack zIndex={999} position="absolute" width="100%" top="5%">
        {toasts.map((toast) => toast)}
      </YStack>
      {children}
    </ToastContext.Provider>
  );
}
