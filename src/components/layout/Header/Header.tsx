import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import cls from "./Header.module.css";
import { useAuth } from "@/auth/useAuth";
import { signOut } from "@/auth/authApi";

export const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSignOutHandler = async () => {
    navigate("/about", { replace: true });
    await signOut();
    toast.success("Вы вышли из аккаунта");
  };

  return (
    <header className={cls.header}>
      <Link to={user ? "/mywishes" : "/"} className={cls.logoWrapper}>
        <img src="./../icon-unicorn.png" className={cls.unicornIcon} alt="logo" />
        <span>wishTick</span>
      </Link>

      {user && (
        <nav className={cls.navCenter}>
          <ul className={cls.headerNav}>
            <li>
              <Link to="/about">О проекте</Link>
            </li>
            <li>
              <Link to="/ideas">Вдохновись идеями</Link>
            </li>
            <li>
              <Link to="/mywishes">Мои желания</Link>
            </li>
          </ul>
        </nav>
      )}

      <div className={cls.actions}>
        {user ? (
          <button className={cls.navLink} onClick={onSignOutHandler}>
            Выйти
          </button>
        ) : (
          <>
            <Link to="/signin" className={cls.navLink}>
              Войти
            </Link>
            <Link to="/signup" className={cls.btnPrimary}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
