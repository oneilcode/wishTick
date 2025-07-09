import { useNavigate, useParams } from 'react-router-dom';
import cls from './DetailedWishPage.module.css';
import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';

const WISHES_URL = "http://localhost:8801"

export const DetailedWishPage = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [card, setCard] = useState(null)

  const getWishesCards = async (url) => {
    try {
      const response = await fetch(`${WISHES_URL}/wishes/${params.id}`)
      const wishes = await response.json()
      setCard(wishes)
         
    } catch (error) {
      console.error(error);
    }
  }

    useEffect(() => {
      getWishesCards()
    }, [])

  return (
  <>
  {
    card !== null &&
    (
      <div className={cls.cardContainer}>
      <div className={cls.card}>
      <div className={cls.cardBtnWrapper}>
          <Button className={cls.cardEdit} onClick={() => navigate(`/`)}>Назад</Button>
          <p>Статус <span className={`${cls.cardLabel} ${card.completed ? cls.done : cls.undone}`} >{card.completed ? "исполнилось :)" : "жду :|"}</span></p>
        </div> 
        
        <h5 className={cls.cardTitle}>{card.wish}</h5>
        <p>{card.description}</p>
        <img className={cls.cardImage} src={card.img} alt="wish image" />
        <div className={cls.cardBtnWrapper}>
          <p>Дата создания:  {card.editDate} </p>
          <Button className={cls.cardEdit} onClick={() => navigate(`/editwish/${card.id}`)}>Редактировать</Button>
        </div> 
      </div>
    </div>
    
    )
  }
    
  </>
  );
};
