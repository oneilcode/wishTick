import cls from "./Button.module.css";

export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={cls.btn}>{props.children}</button>
  );
};
