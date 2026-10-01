import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import cls from "./DetailedWishPage.module.css";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { getWishById, deleteWish, updateWish } from "@/api/wishes";
import type { Wish } from "@/types/wish";
import { formatDate } from "@/utils/formatDate";
import { DEFAULT_WISH_IMAGE } from "@/constants/defaultWishImage";

export const DetailedWishPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [card, setCard] = useState<Wish | null>(null);
  const [imgSrc, setImgSrc] = useState(DEFAULT_WISH_IMAGE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWish = async () => {
      setIsLoading(true);
      const { data, error } = await getWishById(id);
      setIsLoading(false);

      if (error) {
        toast.error(`Ошибка: ${error.message}`);
        return;
      }
      setCard(data);
    };

    fetchWish();
  }, [id]);

  useEffect(() => {
    setImgSrc(card?.img || DEFAULT_WISH_IMAGE);
  }, [card]);

  const onRemoveWishHandler = () => {
    if (!id) return;

    toast("Удалить желание?", {
      description: "Это действие нельзя отменить",
      duration: 7000,
      action: {
        label: "Удалить",
        onClick: async () => {
          const { error } = await deleteWish(id);

          if (error) {
            toast.error(`Ошибка: ${error.message}`);
            return;
          }

          toast.success("Желание удалено");
          navigate("/mywishes");
        },
      },
      cancel: {
        label: "Отмена",
        onClick: () => {},
      },
    });
  };

  const onCheckboxChangeHandler = async () => {
    if (!id || !card) return;

    const { data, error } = await updateWish(id, { completed: !card.completed });

    if (error) {
      toast.error(`Ошибка: ${error.message}`);
      return;
    }

    if (data) {
      setCard(data);
    }
  };

  if (isLoading) return <Loader />;
  if (!card) return <p>Желание не найдено</p>;

  return (
    <div className={cls.cardContainer}>
      <div className={cls.card}>
        <div className={cls.cardBtnWrapper}>
          <Button className={cls.cardEdit} onClick={() => navigate("/mywishes")}>
            Назад
          </Button>
          <label className={cls.cardStatus}>
            <input
              type="checkbox"
              checked={card.completed}
              onChange={onCheckboxChangeHandler}
              className={cls.hiddenCheckbox}
            />
            Изменить статус{" "}
            <span className={`${cls.cardLabel} ${card.completed ? cls.done : cls.undone}`}>
              {card.completed ? "исполнилось :)" : "жду :|"}
            </span>
          </label>
        </div>

        <h5 className={cls.cardTitle}>{card.wish}</h5>
        <p>{card.description}</p>
        <img
          className={cls.cardImage}
          src={imgSrc}
          onError={() => setImgSrc(DEFAULT_WISH_IMAGE)}
          alt={card.wish}
          loading="lazy"
        />
        <div className={cls.cardBtnWrapper}>
          <p>Дата создания/последнего редактирования: {formatDate(card.editDate)}</p>
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
  );
};
