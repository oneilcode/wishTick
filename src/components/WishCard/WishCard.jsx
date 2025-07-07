import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import cls from "./WishCard.module.css";

export const WishCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.card}>
      <div className={cls.cardLabelWrapper}>
        <span className={`${cls.cardLabel} ${card.completed ? cls.done : cls.undone}`} >{card.completed ? "исполнилось :)" : "жду :|"}</span>
      </div>
      <h5 className={cls.cardTitle}>{card.wish}</h5>
      <img className={cls.cardImage} src={card.img} alt="wish image" />
      <Button onClick={() => navigate(`/more/${card.id}`)}>Подробнее</Button>
    </div>
  );
};
