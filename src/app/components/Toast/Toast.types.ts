import { ToastTypes } from "@/contexts/toasts/toastsContext.types";

export interface ToastProps {
  message: string;
  type: ToastTypes;
}
