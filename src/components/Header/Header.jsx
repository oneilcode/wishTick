import { GiUnicorn } from "react-icons/gi";
import cls from "./Header.module.css";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={cls.header}>
      <div className={cls.iconWrapper} onClick={() => navigate("/")}>
        <span>wishTick</span>
        <GiUnicorn className={cls.unicornIcon} />
      </div>
      <div>
        <Button onClick={() => navigate("/addwish")}>Add wish</Button>
      </div>
    </header>
  );
};
