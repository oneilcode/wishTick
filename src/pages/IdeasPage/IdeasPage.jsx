
import { useEffect, useState } from 'react';
import cls from './IdeasPage.module.css';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';

export const IdeasPage = () => {
  const [pictures, setPictures] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const increment = 10; 
  const [isLoading, setLoading] = useState(false)
  const [loadedImages, setLoadedImages] = useState({});
  
  const getPictures = async () => {
    try {
      setLoading(true)
      setLoadedImages({})

      await new Promise((res) => setTimeout(res, 2000));

      const response = await fetch("https://api.unsplash.com/photos/random?count=30",
        {
          headers: {
            'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`
          }
        }
      );
      const data = await response.json();
      
      setPictures(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getPictures();
  }, []); // Пустой массив зависимостей означает, что эффект сработает только при монтировании

  return (
    <>
      {isLoading && <Loader />}

    <div className={cls.picturesWrapper}>
      {pictures.slice(0, visibleCount).map((picture) => (
        <div key={picture.id} className={cls.pictureCard}>
          <div className={cls.imageContainer}>
            <img 
              src={picture.urls?.small} 
              alt={picture.alt_description || ''}
              style={{ opacity: loadedImages[picture.id] ? 1 : 0 }}
              onLoad={() => setLoadedImages(prev => ({ ...prev, [picture.id]: true }))}
              className={cls.pictureImage}
            />
            {!loadedImages[picture.id] && <div className={cls.skeleton}></div>}
          </div>
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