import { Toaster } from "sonner";
import cls from "./AppToaster.module.css";

export const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      closeButton
      toastOptions={{
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
