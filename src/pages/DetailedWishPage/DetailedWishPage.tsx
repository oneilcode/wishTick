import { useNavigate, useParams } from "react-router-dom";
import cls from "./DetailedWishPage.module.css";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getWishById, deleteWish, updateWish } from "../../api/wishes";
import type { Wish } from "../../types/wish";
import { formatDate } from "../../utils/formatDate";

export const DetailedWishPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState<Wish | null>(null);

  const checkboxId = useId();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchWish = async () => {
      const { data, error } = await getWishById(id);
      if (error) {
        console.error(error);
        return;
      }
      setCard(data);
    };

    fetchWish();
  }, [id]);

  useEffect(() => {
    if (card !== null) {
      setIsChecked(card.completed);
    }
  }, [card]);

  const [removeWish] = useFetch<void, void>(async (): Promise<void> => {
    if (!id) return;

    const { error } = await deleteWish(id);
    if (error) {
      console.error(error);
      return;
    }

    navigate("/mywishes");
  });

  const [updateCard] = useFetch(async (nextChecked: boolean) => {
    if (!id) return;

    const { data, error } = await updateWish(id, { completed: nextChecked });
    if (error) {
      console.error(error);
      return;
    }

    setCard(data);
  });

  const onRemoveWishHandler = () => {
    const isRemove = confirm("Удалить желание?");
    if (isRemove) {
      removeWish();
    }
  };

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {card !== null && (
        <div className={cls.cardContainer}>
          <div className={cls.card}>
            <div className={cls.cardBtnWrapper}>
              <Button className={cls.cardEdit} onClick={() => navigate(`/mywishes`)}>
                Назад
              </Button>
              <input
                type="checkbox"
                id={checkboxId}
                checked={isChecked}
                onChange={onCheckboxChangeHandler}
                className={cls.hiddenCheckbox}
              />
              <label htmlFor={checkboxId} className={cls.cardStatus}>
                Изменить статус{" "}
                <span className={`${cls.cardLabel} ${card.completed ? cls.done : cls.undone}`}>
                  {card.completed ? "исполнилось :)" : "жду :|"}
                </span>
              </label>
            </div>

            <h5 className={cls.cardTitle}>{card.wish}</h5>
            <p>{card.description}</p>
            <img className={cls.cardImage} src={card.img} alt="wish image" />
            <div className={cls.cardBtnWrapper}>
              <p>Дата создания/последнего редактирования: {formatDate(card.editDate)} </p>
              <div className={cls.cardButtons}>
                <Button className={cls.cardEdit} onClick={() => navigate(`/editwish/${card.id}`)}>
                  Редактировать
                </Button>
                <Button className={cls.cardEdit} onClick={onRemoveWishHandler}>
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
