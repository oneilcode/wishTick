import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "@/auth/authApi";
import { AuthForm } from "@/components/ui/AuthForm";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signUpError, alreadyExists } = await signUp(email.trim(), password);

    setIsLoading(false);

    if (alreadyExists) {
      setError("Этот email уже зарегистрирован. Войдите или восстановите пароль.");
      return;
    }

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    navigate("/verify-email", { state: { email } });
  };

  return (
    <AuthForm
      title="Регистрация"
      email={email}
      password={password}
      error={error}
      isLoading={isLoading}
      submitText="Зарегистрироваться"
      loadingText="Регистрация..."
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      footer={
        <>
          Уже есть аккаунт? <Link to="/signin">Войти</Link>
        </>
      }
    />
  );
};
