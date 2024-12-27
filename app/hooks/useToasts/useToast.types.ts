import { ToastTypes } from "@/contexts/toastContext/toastContext.types";

export type CreateToastFn = (
  message: string,
  type: ToastTypes,
  duration: number,
) => void;
