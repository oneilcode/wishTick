import { Link, useNavigate } from "react-router-dom";
import cls from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <div className={cls.iconWrapper} onClick={() => navigate("/")}>
        <img src="./../icon-unicorn.png" className={cls.unicornIcon} alt="logo" />
        <span>wishTick</span>
      </div>
      <nav>
        <ul className={cls.headerNav}>
          <li>
            <Link to="/about">Как это работает</Link>
          </li>
          <li>
            <Link to="/page2">Вдохновись идеями</Link>
          </li>
        </ul>
    </nav> 
    </header>
  );
};
