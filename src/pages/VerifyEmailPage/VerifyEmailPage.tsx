import { Link, useLocation } from "react-router-dom";
import cls from "./VerifyEmailPage.module.css";

export const VerifyEmailPage = () => {
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email;

  return (
    <div className={cls.page}>
      <div className={cls.card}>
        <div className={cls.icon}>✉️</div>

        <h1 className={cls.title}>Проверьте почту</h1>

        <p className={cls.text}>
          {email ? (
            <>
              Мы отправили письмо на <strong>{email}</strong>.
              <br />
              Перейдите по ссылке в письме, чтобы подтвердить аккаунт.
            </>
          ) : (
            <>
              Мы отправили письмо с подтверждением.
              <br />
              Перейдите по ссылке в письме, чтобы подтвердить аккаунт.
            </>
          )}
        </p>

        <div className={cls.hint}>
          <strong>Не нашли письмо?</strong>
          <ul>
            <li>Проверьте папку «Спам» или «Промоакции»</li>
            <li>Убедитесь, что email введён верно</li>
            <li>Письмо может прийти в течение 1-2 минут</li>
          </ul>
        </div>

        <Link to="/signin" className={cls.link}>
          Вернуться к входу
        </Link>
      </div>
    </div>
  );
};
