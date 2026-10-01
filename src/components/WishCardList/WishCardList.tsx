import { memo } from "react";
import { WishCard } from "../WishCard";
import cls from "./WishCardList.module.css";
import type { Wish } from "@/types/wish";

interface WishCardListProps {
  cards: Wish[];
  onDelete: (id: string) => void;
  onUpdate: (updatedCard: Wish) => void;
}

export const WishCardList = memo(({ cards, onDelete, onUpdate }: WishCardListProps) => {
  return (
    <div className={cls.wishesWrapper}>
      {cards.map((card) => (
        <WishCard key={card.id} card={card} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
});
