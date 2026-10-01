import { Link, useNavigate } from "react-router-dom";
import cls from "./Header.module.css";
import { useAuth } from "@/auth/useAuth";
import { signOut } from "@/auth/authApi";

export const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSignOutHandler = async () => {
    navigate("/", { replace: true });
    await signOut();
  };

  return (
    <header className={cls.header}>
      <div className={cls.iconWrapper} onClick={() => navigate("/")}>
        <img src="./../icon-unicorn.png" className={cls.unicornIcon} alt="logo" />
        <span>wishTick</span>
      </div>
      <nav>
        <ul className={cls.headerNav}>
          {user ? (
            <>
              <li>
                <Link to="/ideas">Вдохновись идеями</Link>
              </li>
              <li>
                <Link to="/mywishes">Мои желания</Link>
              </li>
              <li>
                <button className={cls.navLink} onClick={onSignOutHandler}>
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">Войти</Link>
              </li>
              <li>
                <Link to="/signup">Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
