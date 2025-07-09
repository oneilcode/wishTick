
import { useEffect, useState } from 'react';
import cls from './IdeasPage.module.css';
import { Button } from '../../components/Button';

export const IdeasPage = () => {
  const [pictures, setPictures] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const increment = 10; 
  
  const getPictures = async () => {
    try {
      const response = await fetch("https://api.unsplash.com/photos/random?count=30",
        {
          headers: {
            'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
          }
        }
      );
      const data = await response.json();
      console.log(data);
      
      setPictures(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPictures();
  }, []); // Пустой массив зависимостей означает, что эффект сработает только при монтировании

  return (
    <>
    <div className={cls.picturesWrapper}>
     {pictures.slice(0, visibleCount).map((picture) => (
        <div key={picture.id} className={cls.pictureCard}>
          <img src={picture.urls.small} alt="" />
        </div>
      ))}  
    </div>

    {visibleCount < pictures.length && (
      <div className={cls.more}>
        <Button onClick={() => setVisibleCount(prev => prev + increment)}>Показать еще {increment}</Button>
      </div>
    )}
</>
  );
};