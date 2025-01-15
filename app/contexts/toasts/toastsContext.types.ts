export type ToastTypes = "info" | "error" | "success";

export type ToastTypeFn = (message: string, duration: number) => void;

export type ToastFunctions = Record<ToastTypes, ToastTypeFn>;
