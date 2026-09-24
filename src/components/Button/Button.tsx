import type { ReactNode, MouseEventHandler } from "react";
import cls from "./Button.module.css";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export const Button = ({ onClick, children, isDisabled, className }: ButtonProps) => {
  return (
    <button disabled={isDisabled} onClick={onClick} className={`${cls.btn} ${className ?? ""}`}>
      {children}
    </button>
  );
};
