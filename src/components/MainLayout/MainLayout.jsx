import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={cls.mainLayot}>
      <Header />
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
        Мечты становятся реальностью с WishTick!
          <br />
          
          by Viktoriia O'Neil | {currentYear}
          <br />
          <br />
        </footer>
      </div>
    </div>
  );
};
