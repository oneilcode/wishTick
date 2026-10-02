import { useEffect, useState, type ChangeEvent } from "react";
import cls from "./MyWishesPage.module.css";
import { Loader } from "@/components/ui/Loader";
import { WishCardList } from "@/components/wish/WishCardList";
import { getWishes } from "@/api/wishes";
import type { Wish } from "@/types/wish";
import { EmptyWishesState } from "@/components/wish/EmptyWishesState";
import { WishToolbar } from "@/components/wish/WishToolbar";

export const MyWishesPage = () => {
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
      <WishToolbar
        searchValue={searchValue}
        onSearchChange={onSearchChangeHandler}
        sortValue={sortValue}
        onSortChange={onSortChangeHandler}
      />

      {cards.length === 0 && (
        <p className={cls.notFound}>Ничего не найдено по запросу «{searchValue}»</p>
      )}

      {cards.length > 0 && (
        <WishCardList cards={cards} onDelete={onDeleteHandler} onUpdate={onUpdateHandler} />
      )}
    </>
  );
};
