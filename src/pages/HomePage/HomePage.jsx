import { useEffect, useState } from 'react';
import cls from './HomePage.module.css';
import { Loader } from '../../components/Loader';
import { SearchInput } from '../../components/SearchInput';
import { WishCardList } from '../../components/WishCardList';
import { SelectWishCards } from '../../components/SelectWishCards';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const WISHES_URL = "http://localhost:8801"

export const HomePage = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("")
  const [wishes, setWishes] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [sortSelectValue, setSortSelectValue] = useState("")

  const getWishesCards = async (url) => {
    try {
      setLoading(true)

      await new Promise((res) => setTimeout(res, 2000))
      const response = await fetch(`${WISHES_URL}/${url}`)
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
    setSearchValue(e.target.value)
  }

  const onSortSelectHandler = (e) => {
    setSortSelectValue(e.target.value)
  }

  useEffect(() => {
    getWishesCards(`wishes?${sortSelectValue}`)
  }, [sortSelectValue])

  return (
    <> 
      {isLoading && <Loader />}
  
      <div className={cls.searchWrapper}>
        <div>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler}/> 
        </div>

        <div>
        <SelectWishCards value={sortSelectValue} onChange={onSortSelectHandler}/> 
        </div>
        
        

        <div>
          <Button onClick={() => navigate("/addwish")}>Добавить</Button>
        </div>
      </div>

      {cards.length === 0 && <p className={cls.searchNoElements}>Нет элементов...</p>}
    
      <WishCardList cards={cards}/>
    </>
  );
};
