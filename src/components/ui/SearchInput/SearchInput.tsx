import type { ChangeEventHandler } from "react";
import cls from "./SearchInput.module.css";

interface SearchInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={cls.search}
      placeholder="Поиск..."
    />
  );
};
