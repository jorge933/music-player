import { ToastTypes } from "@/contexts/toasts/toastsContext.types";

export type CreateToastFn = (
  message: string,
  type: ToastTypes,
  duration: number,
  id?: string,
) => void;
