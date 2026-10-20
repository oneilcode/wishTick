import cls from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={cls.backdrop}>
      <div className={cls.spinner} aria-label="Загрузка" role="status" />
    </div>
  );
};
