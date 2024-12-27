export type ToastTypes = "info" | "error" | "success";

export type CreateToastTypeFn = (message: string, duration: number) => void;

export type ToastFunctions = Record<ToastTypes, CreateToastTypeFn>;

export type ToastContextType = ToastFunctions | null;
