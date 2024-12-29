import { ToastTypes } from "@/contexts/toastsContext/toastsContext.types";

export interface ToastProps {
  message: string;
  type: ToastTypes;
}
