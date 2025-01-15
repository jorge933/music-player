import { ToastsContext } from "@/contexts/toasts/toastsContext";
import { ToastFunctions } from "@/contexts/toasts/toastsContext.types";
import { useContext } from "react";

export function useToastsContext() {
  const toasts = useContext(ToastsContext) as ToastFunctions;

  return toasts;
}
