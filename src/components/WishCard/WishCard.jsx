import { Button } from "../Button/Button";
import cls from "./WishCard.module.css";

export const WishCard = () => {
  return (
    <div className={cls.card}>
      <div className={cls.cardLabel}>
        <span>жду</span>
      </div>
      <h5 className={cls.cardTitle}>Хочу на море</h5>
      <img className={cls.cardImage} src="https://img.freepik.com/premium-photo/scenic-view-sea-against-blue-sky_1048944-12445648.jpg?semt=ais_hybrid&w=740" alt="wish image" />
      <Button onClick={() => {}}>Подробнее</Button>
    </div>
  );
};
