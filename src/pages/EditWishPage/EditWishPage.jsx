// import cls from './EditWishPage.module.css';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { EditWish } from './EditWish';
import { useFetch } from '../../hooks/usefetch';

const WISHES_URL = "http://localhost:8801"

// export const EditWishPage = () => {
//   const [wish, setWish] = useState(null)
//   const { id } = useParams()
//   // const [formState, formAction, isPending] = useActionState(() => {}, {...initialState, clearForm: false})


// const getWishesCardsEdited = async () => {
//   try {
//     // setLoading(true)

//     await new Promise((res) => setTimeout(res, 2000))
//     const response = await fetch(`${WISHES_URL}/wishes/${id}`)
//     const data = await response.json()

//     console.log(data);
    

//     setWish(data)
       
//   } catch (error) {
//     console.error(error);
//   } finally {
//     // setLoading(false)
//   }
// }

//  useEffect(() => {
//   getWishesCardsEdited()
//   }, [])


//   return (
//     <> 
//       {/* {isPending && <Loader />} */}

//       <h2 className={cls.formTitle}>Редактировать желание</h2>

//       <WishForm initialState={wish} formAction={formAction} state={formState} isPending={isPending} submitBtnText="Редактировать форму"/>
//     </>
//   );
// };


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