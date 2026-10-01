import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../Button/Button";
import cls from "./WishCard.module.css";
import { deleteWish, updateWish } from "../../api/wishes";
import type { Wish } from "../../types/wish";

interface WishCardProps {
  card: Wish;
  onDelete: (id: string) => void;
  onUpdate: (updatedCard: Wish) => void;
}

export const WishCard = ({ card, onDelete, onUpdate }: WishCardProps) => {
  const navigate = useNavigate();

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
    const { data, error } = await updateWish(card.id, { completed: !card.completed });

    if (error) {
      toast.error(`Ошибка: ${error.message}`);
      return;
    }

    if (data) {
      onUpdate(data);
    }
  };

  return (
    <div className={cls.card}>
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
      <img className={cls.cardImage} src={card.img} alt="wish image" />

      <div className={cls.cardButtons}>
        <Button onClick={() => navigate(`/more/${card.id}`)}>Подробнее</Button>
        <Button onClick={onDeleteHandler}>Удалить</Button>
      </div>
    </div>
  );
};
