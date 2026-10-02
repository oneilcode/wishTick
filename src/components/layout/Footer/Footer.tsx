import cls from "./Footer.module.css";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className={cls.footer}>
      Мечты становятся реальностью с WishTick!
      <br />
      by Viktoriia O'Neil | {currentYear}
      <br />
    </footer>
  );
};
