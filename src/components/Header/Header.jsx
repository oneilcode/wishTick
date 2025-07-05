import { GiUnicorn } from "react-icons/gi";
import cls from "./Header.module.css";
import { Button } from "../Button/Button";

export const Header = () => {
  return (
    <header className={cls.header}>
      <a className={cls.iconWrapper} href="/">
        <span>wishTick</span>
        <GiUnicorn className={cls.unicornIcon} />
      </a>
      <div>
        <Button>Add wish</Button>
      </div>
    </header>
  );
};
