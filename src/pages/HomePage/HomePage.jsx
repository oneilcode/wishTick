import { useEffect, useState } from 'react';
import { WishCard } from '../../components/WishCard';
import cls from './HomePage.module.css';
import { Loader } from '../../components/Loader';

const WISHES_URL = "http://localhost:8801"

export const HomePage = () => {
  const [wishes, setWishes] = useState([])
  const [isLoading, setLoading] = useState(false)

  const getWishesCards = async () => {
    try {
      setLoading(true)

      await new Promise((res) => setTimeout(res, 2000))
      const response = await fetch(`${WISHES_URL}/wishes`)
      const wishes = await response.json()

      setWishes(wishes)
         
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWishesCards()
  }, [])

  return (
    <> 
      {isLoading && <Loader />}
      
      <div className={cls.wishesWrapper}>
        {
          wishes.map((wish, index) => {
            return <WishCard key={index} wish={wish}/>
          })
        }    
      </div>
    </>
  );
};
