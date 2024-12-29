import { ToastsContext } from "@/contexts/toastsContext/toastsContext";
import { ToastFunctions } from "@/contexts/toastsContext/toastsContext.types";
import { useContext } from "react";

export function useToastsContext() {
  const toasts = useContext(ToastsContext) as ToastFunctions;

  return toasts;
}
