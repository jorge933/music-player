import { createContext } from "react";
import { ToastContextType } from "./toastsContext.types";

export const ToastsContext = createContext<ToastContextType>(null);
