import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import cls from "./MyWishesPage.module.css";
import { Loader } from "@/components/ui/Loader";
import { SearchInput } from "@/components/ui/SearchInput";
import { WishCardList } from "@/components/wish/WishCardList";
import { SelectWishCards } from "@/components/ui/SelectWishCards";
import { Button } from "@/components/ui/Button";
import { getWishes } from "@/api/wishes";
import type { Wish } from "@/types/wish";
import { EmptyWishesState } from "@/components/wish/EmptyWishesState";

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

  if (isLoading) return <Loader />;

  if (wishes.length === 0) {
    return <EmptyWishesState />;
  }

  return (
    <>
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

      {cards.length === 0 && (
        <p className={cls.notFound}>Ничего не найдено по запросу «{searchValue}»</p>
      )}

      {cards.length > 0 && (
        <WishCardList cards={cards} onDelete={onDeleteHandler} onUpdate={onUpdateHandler} />
      )}
    </>
  );
};
