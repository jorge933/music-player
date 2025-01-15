import { ToastsContext } from "@/contexts/toasts/toastsContext";
import {
  ToastFunctions,
  ToastTypes,
} from "@/contexts/toasts/toastsContext.types";
import { useToastsManager } from "@/hooks/useToastsManager/useToastsManager";
import { ReactNode, useMemo } from "react";
import { YStack } from "tamagui";

export function ToastsProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast } = useToastsManager();
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
    <ToastsContext.Provider value={toastActions}>
      <YStack zIndex={999} position="absolute" width="100%" top="5%">
        {toasts.map((toast) => toast)}
      </YStack>
      {children}
    </ToastsContext.Provider>
  );
}
