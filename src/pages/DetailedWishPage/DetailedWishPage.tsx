import { useNavigate, useParams } from "react-router-dom";
import cls from "./DetailedWishPage.module.css";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import type { Wish } from "../../types/wish";

const WISHES_URL = import.meta.env.VITE_SERVER_URL;

export const DetailedWishPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [card, setCard] = useState<Wish | null>(null);

  const checkboxId = useId();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getWishesCards = async () => {
      try {
        const response = await fetch(`${WISHES_URL}/wishes/${params.id}`);
        const data = await response.json();
        setCard(data);
      } catch (error) {
        console.error(error);
      }
    };

    getWishesCards();
  }, [params.id]);

  useEffect(() => {
    if (card !== null) {
      setIsChecked(card.completed);
    }
  }, [card]);

  const [removeWish] = useFetch<void, void>(async (): Promise<void> => {
    await fetch(`${WISHES_URL}/wishes/${params.id}`, {
      method: "DELETE",
    });

    navigate("/");
  });

  const [updateCard] = useFetch(async (isChecked: boolean) => {
    const response = await fetch(`${WISHES_URL}/wishes/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });

    const data = await response.json();
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
              <Button className={cls.cardEdit} onClick={() => navigate(`/`)}>
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
              <p>Дата создания/последнего редактирования: {card.editDate} </p>
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
