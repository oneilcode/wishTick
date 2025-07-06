import { useEffect, useState } from 'react';
import { WishCard } from '../../components/WishCard';
import cls from './HomePage.module.css';

const WISHES_URL = "http://localhost:8801"

export const HomePage = () => {
  const [wishes, setWishes] = useState([])

  const getWishesCards = async () => {
    try {
      const response = await fetch(`${WISHES_URL}/wishes`)
      const wishes = await response.json()

      setWishes(wishes)
      console.log(wishes);
         
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWishesCards()
  }, [])

  return (
    <div className={cls.wishesWrapper}>
      {
        wishes.map((wish, index) => {
          return <WishCard key={index} wish={wish}/>
        })
      }    
    </div>
  );
};
