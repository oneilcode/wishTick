import { useState, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "@/auth/authApi";
import { AuthForm } from "@/components/ui/AuthForm";

export const SignInPage = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const signInError = await signIn(email.trim(), password);

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    navigate("/mywishes");
  };

  return (
    <AuthForm
      title="Вход"
      email={email}
      password={password}
      error={error}
      isLoading={isLoading}
      submitText="Войти"
      loadingText="Вход..."
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      footer={
        <>
          Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
        </>
      }
    />
  );
};
