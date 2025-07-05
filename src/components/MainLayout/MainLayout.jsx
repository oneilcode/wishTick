import cls from "./MainLayout.module.css";

export const MainLayout = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className={cls.mainLayot}>
      <header>header</header>
      <div className={cls.mainWrapper}>
        <main className={cls.main}>main</main>
        <footer className={cls.footer}>
            wishTick application | {currentYear} <br />
             by Viktoriia O'Neil
        </footer>
      </div>
    </div>
  );
};
