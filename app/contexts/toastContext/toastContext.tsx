import { createContext } from "react";
import { ToastContextType } from "./toastContext.types";

export const ToastContext = createContext<ToastContextType>(null);
