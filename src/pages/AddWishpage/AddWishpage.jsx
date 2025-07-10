import cls from './AddWishpage.module.css';
import { useActionState } from 'react';
import { Loader } from '../../components/Loader';
import { WishForm } from '../../components/WishForm';

const WISHES_URL = "http://localhost:8801"

const createCardAction = async(_prevState, formData) => {
  try {
    await new Promise((res) => setTimeout(res, 2000))

    const newWishCard = Object.fromEntries(formData)

    const response = fetch(`${WISHES_URL}/wishes`, {
      method: "POST",
      body: JSON.stringify({
        wish: newWishCard.wish,
        description: newWishCard.description,
        img: newWishCard.img,
        completed: false,
        editDate: undefined,
      })
    })

    if(!response.ok) {
      throw new Error(await response.statusText);
      
    }
    const newWish = response.json()

    return {}
  } catch (error) {
   console.log(error);
   
  }
}

export const AddWishpage = () => {
const [formState, formAction, isPending] = useActionState(createCardAction, {clearForm: false})

  return (
    <> 
      {isPending && <Loader />}

      <h2 className={cls.formTitle}>Добавить желание</h2>

      <WishForm formAction={formAction} isPending={isPending} submitBtnText="Добавить желание"/>
    </>
  );
};
