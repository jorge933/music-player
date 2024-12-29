import { ToastTypes } from "@/contexts/toastsContext/toastsContext.types";

export type CreateToastFn = (
  message: string,
  type: ToastTypes,
  duration: number,
) => void;
