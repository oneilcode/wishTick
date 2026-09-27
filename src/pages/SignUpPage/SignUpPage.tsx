import { useState, type SyntheticEvent, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../auth/authApi";
import { Button } from "../../components/Button";
import cls from "./SignUpPage.module.css";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const signUpError = await signUp(email, password);

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    navigate("/");
  };

  return (
    <form className={cls.form} onSubmit={onSubmitHandler}>
      <h2 className={cls.title}>Регистрация</h2>

      <div className={cls.formControl}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={cls.formControl}>
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {error && <p className={cls.error}>{error}</p>}

      <Button isDisabled={isLoading}>{isLoading ? "Регистрация..." : "Зарегистрироваться"}</Button>

      <p>
        Уже есть аккаунт? <Link to="/signin">Войти</Link>
      </p>
    </form>
  );
};
