import { useEffect, useState, type ChangeEvent } from "react";
import cls from "./MyWishesPage.module.css";
import { Loader } from "@/components/Loader";
import { SearchInput } from "@/components/SearchInput";
import { WishCardList } from "@/components/WishCardList";
import { SelectWishCards } from "@/components/SelectWishCards";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { getWishes } from "@/api/wishes";
import type { Wish } from "@/types/wish";

export const MyWishesPage = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [sortValue, setSortValue] = useState<"asc" | "desc" | "">("");

  const fetchWishes = async () => {
    setLoading(true);
    const { data, error } = await getWishes(sortValue || undefined);

    if (error) {
      console.error(error);
    } else if (data) {
      setWishes(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWishes();
  }, [sortValue]);

  const cards = wishes.filter((el) =>
    el.wish.toLowerCase().includes(searchValue.trim().toLowerCase()),
  );

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSortChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value as "asc" | "desc" | "");
  };

  const onDeleteHandler = (id: string) => {
    setWishes((prev) => prev.filter((wish) => wish.id !== id));
  };

  const onUpdateHandler = (updatedCard: Wish) => {
    setWishes((prev) => prev.map((wish) => (wish.id === updatedCard.id ? updatedCard : wish)));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={cls.searchWrapper}>
        <div>
          <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
        </div>

        <div>
          <SelectWishCards value={sortValue} onChange={onSortChangeHandler} />
        </div>

        <div>
          <Button onClick={() => navigate("/addwish")}>Добавить</Button>
        </div>
      </div>
      {cards.length === 0 && <p className={cls.searchNoElements}>Нет элементов...</p>}
      <WishCardList cards={cards} onDelete={onDeleteHandler} onUpdate={onUpdateHandler} />.
    </>
  );
};
