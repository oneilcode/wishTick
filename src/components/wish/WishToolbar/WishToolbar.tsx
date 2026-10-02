import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import cls from "./WishToolbar.module.css";
import { SearchInput } from "@/components/ui/SearchInput";
import { SelectWishCards } from "@/components/ui/SelectWishCards";
import { Button } from "@/components/ui/Button";

type SortValue = "asc" | "desc" | "";

interface WishesToolbarProps {
  searchValue: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  sortValue: SortValue;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const WishToolbar = ({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: WishesToolbarProps) => {
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      <div className={cls.search}>
        <SearchInput value={searchValue} onChange={onSearchChange} />
      </div>

      <div className={cls.select}>
        <SelectWishCards value={sortValue} onChange={onSortChange} />
      </div>

      <div className={cls.action}>
        <Button onClick={() => navigate("/addwish")}>Добавить</Button>
      </div>
    </div>
  );
};
