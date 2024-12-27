import { ToastTypes } from "@/contexts/toastContext/toastContext.types";

export interface ToastProps {
  message: string;
  type: ToastTypes;
}
