import cls from "./SelectWishCards.module.css";

export const SelectWishCards = ( {value, onChange}) => {
  return (
    <select className={cls.select} value={value} onChange={onChange}>
      <option value="">Сортировать</option>
      <option value="_sort=completed">Исполнилось</option>
      <option value="_sort=-completed">Жду</option>
  </select>
  ) 
};
