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
          wishTick application | {currentYear}
          <br />
          by Viktoriia O'Neil
        </footer>
      </div>
    </div>
  );
};
