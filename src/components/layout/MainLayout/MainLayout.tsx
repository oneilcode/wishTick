import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";
import { Footer } from "../Footer";

export const MainLayout = () => {
  return (
    <div className={cls.mainLayot}>
      <Header />
      <main className={cls.mainWrapper}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
