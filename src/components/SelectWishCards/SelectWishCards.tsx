import type { ChangeEventHandler } from "react";
import cls from "./SelectWishCards.module.css";

interface SelectWishCardsProps {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const SelectWishCards = ({ value, onChange }: SelectWishCardsProps) => {
  return (
    <select className={cls.select} value={value} onChange={onChange}>
      <option value="">Сортировать</option>
      <option value="asc">Исполнилось</option>
      <option value="desc">Жду</option>
    </select>
  );
};
