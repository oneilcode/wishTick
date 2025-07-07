import { memo } from "react";
import { WishCard } from "../WishCard";
import cls from "./WishCardList.module.css";

export const WishCardList = memo (({ cards }) => {

  return (
    <div className={cls.wishesWrapper}>
      {
        cards.map((card, index) => {
          return <WishCard key={index} card={card}/>
        })
      }    
    </div>
  )
});
