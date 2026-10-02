import { useMemo } from "react";
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

export const EmptyWishesState = () => {
  const navigate = useNavigate();

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: STAR_COUNT }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 5, // 4-9s — медленнее
    }));
  }, []);

  return (
    <div className={cls.wrapper}>
      <div className={cls.blob1} aria-hidden="true" />
      <div className={cls.blob2} aria-hidden="true" />

      <div className={cls.stars} aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className={cls.star}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              fontSize: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
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
