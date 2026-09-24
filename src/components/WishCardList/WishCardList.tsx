import { memo } from "react";
import { WishCard } from "../WishCard";
import cls from "./WishCardList.module.css";
import type { Wish } from "../../types/wish";

interface WishCardListProps {
  cards: Wish[];
}

export const WishCardList = memo(({ cards }: WishCardListProps) => {
  return (
    <div className={cls.wishesWrapper}>
      {cards.map((card) => {
        return <WishCard key={card.id} card={card} />;
      })}
    </div>
  );
});
