import { useEffect, useState } from 'react';
import cls from './HomePage.module.css';
import { Loader } from '../../components/Loader';
import { SearchInput } from '../../components/SearchInput';
import { WishCardList } from '../../components/WishCardList';

const WISHES_URL = "http://localhost:8801"

export const HomePage = () => {

  const [searchValue, setSearchValue] = useState("")
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

  const cards = wishes.filter((el) => el.wish.toLowerCase().includes(searchValue.trim().toLowerCase()))

  const onSearchChangeHandler = (e) => {
    console.log('e.target.value');
    
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    getWishesCards()
  }, [])

  return (
    <> 
      {isLoading && <Loader />}

     
      <div className={cls.searchInput}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler}/>
      </div>

      {cards.length === 0 && <p>Нет элементво</p>}
    
      <WishCardList cards={cards}/>
    </>
  );
};
