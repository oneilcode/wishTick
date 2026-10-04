import { useNavigate } from "react-router-dom";
import cls from "./EmptyWishesState.module.css";

const STAR_COUNT = 30;

type Star = {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

const STARS: Star[] = Array.from({ length: STAR_COUNT }).map(() => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: 6 + Math.random() * 8,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 5,
}));

export const EmptyWishesState = () => {
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      <div className={cls.blob1} aria-hidden="true" />
      <div className={cls.blob2} aria-hidden="true" />

      <div className={cls.stars} aria-hidden="true">
        {STARS.map((star, index) => (
          <span
            key={index}
            className={cls.star}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              fontSize: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <h2 className={cls.title}>Добро пожаловать в WishTick</h2>
      <p className={cls.text}>Мечты сбываются, когда их записывают</p>
      <button type="button" className={cls.ctaButton} onClick={() => navigate("/addwish")}>
        Записать первую мечту <span className={cls.arrow}>→</span>
      </button>
    </div>
  );
};
