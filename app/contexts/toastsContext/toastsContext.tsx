import { createContext } from "react";
import { ToastFunctions } from "./toastsContext.types";

export const ToastsContext = createContext<ToastFunctions | null>(null);
