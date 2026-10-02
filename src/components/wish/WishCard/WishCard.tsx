import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../ui/Button/Button";
import cls from "./WishCard.module.css";
import { deleteWish, updateWish } from "@/api/wishes";
import type { Wish } from "@/types/wish";
import { DEFAULT_WISH_IMAGE } from "@/constants/defaultWishImage";
import { useState } from "react";

interface WishCardProps {
  card: Wish;
  onDelete: (id: string) => void;
  onUpdate: (updatedCard: Wish) => void;
}

export const WishCard = ({ card, onDelete, onUpdate }: WishCardProps) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(card.img || DEFAULT_WISH_IMAGE);

  const performDelete = async () => {
    const { error } = await deleteWish(card.id);

    if (error) {
      toast.error(`Ошибка: ${error.message}`);
      return;
    }

    toast.success("Желание удалено");
    onDelete(card.id);
  };

  const onDeleteHandler = () => {
    toast("Удалить желание?", {
      description: "Это действие нельзя отменить",
      duration: 20000,
      action: {
        label: "Удалить",
        onClick: performDelete,
      },
      cancel: {
        label: "Отмена",
        onClick: () => {},
      },
    });
  };

  const onCheckboxChangeHandler = async () => {
    const wasCompleted = card.completed;

    const { data, error } = await updateWish(card.id, { completed: !card.completed });

    if (error) {
      toast.error(`Ошибка: ${error.message}`);
      return;
    }

    if (data) {
      onUpdate(data);

      if (!wasCompleted && data.completed) {
        toast.success("Желание исполнилось! 🎉", {
          description: "Одно из твоих желаний сбылось - так держать!",
          duration: 4000,
        });
      }
    }
  };

  return (
    <div className={`${cls.card} ${card.completed ? cls.cardDone : ""}`}>
      <label className={cls.statusWrapper}>
        <input
          type="checkbox"
          checked={card.completed}
          onChange={onCheckboxChangeHandler}
          className={cls.checkbox}
        />
        <span className={cls.checkboxCustom} aria-hidden="true" />
        <span className={`${cls.statusText} ${card.completed ? cls.done : cls.undone}`}>
          {card.completed ? "Исполнено" : "Отметить исполненным"}
        </span>
      </label>

      <h5 className={cls.cardTitle}>{card.wish}</h5>
      <img
        className={cls.cardImage}
        src={imgSrc}
        onError={() => setImgSrc(DEFAULT_WISH_IMAGE)}
        alt="wish image"
      />

      <div className={cls.cardButtons}>
        <Button onClick={() => navigate(`/more/${card.id}`)}>Подробнее</Button>
        <Button onClick={onDeleteHandler}>Удалить</Button>
      </div>
    </div>
  );
};
