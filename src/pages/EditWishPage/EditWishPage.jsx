import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { EditWish } from './EditWish';
import { useFetch } from '../../hooks/usefetch';

const WISHES_URL = import.meta.env.VITE_SERVER_URL

export const EditWishPage = () => {
  const { id } = useParams();
  const [wish, setWish] = useState(null);

  const [fetchWish, isWishLoading] = useFetch(async () => {
    const response = await fetch(`${WISHES_URL}/wishes/${id}`);
    const data = await response.json();

    setWish(data);
  });

  useEffect(() => {
    fetchWish();
  }, []);

  return (
    <>
      {isWishLoading && <Loader />}

      {wish && <EditWish initialState={wish}/>}
    </>
  );
};

export default EditWishPage