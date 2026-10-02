import { Toaster } from "sonner";
import cls from "./AppToaster.module.css";

export const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      closeButton
      toastOptions={{
        style: {
          background: "#ffffff",
          color: "#111111",
          border: "1px solid #e8e8e8",
          borderRadius: "12px",
          fontSize: "0.9375rem",
        },
        classNames: {
          toast: cls.toast,
          success: cls.toastSuccess,
          error: cls.toastError,
          closeButton: cls.closeButton,
        },
      }}
    />
  );
};
