import cls from "./WishProgress.module.css";

interface WishProgressProps {
  total: number;
  completed: number;
}

export const WishProgress = ({ total, completed }: WishProgressProps) => {
  if (total === 0) return null;

  const percent = Math.round((completed / total) * 100);

  return (
    <div className={cls.wrapper}>
      <div className={cls.ring}>
        <svg viewBox="0 0 36 36">
          <circle className={cls.ringBg} cx="18" cy="18" r="15.9155" />
          <circle
            className={cls.ringFill}
            cx="18"
            cy="18"
            r="15.9155"
            strokeDasharray={`${percent} 100`}
          />
        </svg>
        <span className={cls.ringValue}>{percent}%</span>
      </div>

      <div className={cls.info}>
        <p className={cls.text}>
          <strong>{completed}</strong> из <strong>{total}</strong> исполнено
        </p>
      </div>
    </div>
  );
};
