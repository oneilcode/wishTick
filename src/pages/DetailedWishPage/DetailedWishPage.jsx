import { useNavigate, useParams } from 'react-router-dom';
import cls from './DetailedWishPage.module.css';
import { Button } from '../../components/Button';
import { useEffect, useId, useState } from 'react';
import { useFetch } from '../../hooks/usefetch';

const WISHES_URL = import.meta.env.VITE_SERVER_URL

export const DetailedWishPage = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [card, setCard] = useState(null)

  const checkboxId = useId();
  const [isChecked, setIsChecked] = useState(false);

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

  useEffect(() => {
    card !== null && setIsChecked(card.completed)
  }, [card])

  const [removeWish, isWishRemoving] = useFetch(async () => {
    await fetch(`${WISHES_URL}/wishes/${params.id}`, {
      method: "DELETE",
    });
  
    navigate("/")
  });


  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${WISHES_URL}/wishes/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify( { completed: isChecked }),
    });

    const data = await response.json()
    setCard(data)

  });

  const onRemoveWishHandler = () => {
    const isRemove = confirm("Удать вопрос?")

    isRemove && removeWish()
  }

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
  <>
    {
      card !== null &&
      (
        <div className={cls.cardContainer}>
        <div className={cls.card}>
        <div className={cls.cardBtnWrapper}>
            <Button className={cls.cardEdit} onClick={() => navigate(`/`)}>Назад</Button>
            <p className={cls.cardStatus} checked={isChecked}  id={checkboxId}
              onClick={onCheckboxChangeHandler}>Изменить статус <span className={`${cls.cardLabel} ${card.completed ? cls.done : cls.undone}`} >{card.completed ? "исполнилось :)" : "жду :|"}</span></p>
          </div> 
      
          <h5 className={cls.cardTitle}>{card.wish}</h5>
          <p>{card.description}</p>
          <img className={cls.cardImage} src={card.img} alt="wish image" />
          <div className={cls.cardBtnWrapper}>
            <p>Дата создания/последнего редактирования:  {card.editDate} </p>
            <div className={cls.cardButtons}> 
              <Button className={cls.cardEdit} onClick={() => navigate(`/editwish/${card.id}`)}>Редактировать</Button>
              <Button className={cls.cardEdit} onClick={onRemoveWishHandler}>Удалить</Button>
            </div>
          </div> 
        </div>
      </div>
      
      )
    }
    
  </>
  );
};
