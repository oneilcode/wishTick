import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import cls from "./WishCard.module.css";

export const WishCard = ({wish}) => {
  const navigate = useNavigate();

  return (
    <div className={cls.card}>
      <div className={cls.cardLabelWrapper}>
        <span className={`${cls.cardLabel} ${wish.completed ? cls.done : cls.undone}`} >{wish.completed ? "исполнилось :)" : "жду :|"}</span>
      </div>
      <h5 className={cls.cardTitle}>{wish.wish}</h5>
      <img className={cls.cardImage} src={wish.img} alt="wish image" />
      <Button onClick={() => navigate(`/more/${wish.id}`)}>Подробнее</Button>
    </div>
  );
};
