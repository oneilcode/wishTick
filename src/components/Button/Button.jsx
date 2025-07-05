import cls from "./Button.module.css";

export const Button = (props) => {
  return (
    <button className={cls.btn}>{props.children}</button>
  );
};
