import cls from "./AuthForm.module.css";
import type { ChangeEvent, ReactNode } from "react";
import { Button } from "../Button";

interface AuthFormProps {
  title: string;
  submitText: string;
  loadingText?: string;
  email: string;
  password: string;
  isLoading: boolean;
  error?: string | null;
  passwordMinLength?: number;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  footer: ReactNode;
}

export const AuthForm = ({
  title,
  email,
  password,
  error,
  isLoading = false,
  submitText,
  loadingText,
  passwordMinLength,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  footer,
}: AuthFormProps) => {
  return (
    <div className={cls.page}>
      <form className={cls.form} onSubmit={onSubmit}>
        <h2 className={cls.title}>{title}</h2>

        <div className={cls.formControl}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={onEmailChange} required />
        </div>

        <div className={cls.formControl}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
            minLength={passwordMinLength}
          />
        </div>

        {error && <p className={cls.error}>{error}</p>}

        <Button className={cls.formBtn} isDisabled={isLoading}>
          {isLoading ? (loadingText ?? submitText) : submitText}
        </Button>

        <p className={cls.footer}>{footer}</p>
      </form>
    </div>
  );
};
