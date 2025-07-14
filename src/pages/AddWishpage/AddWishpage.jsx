import cls from './AddWishpage.module.css';
import { useActionState } from 'react';
import { Loader } from '../../components/Loader';
import { WishForm } from '../../components/WishForm';

const WISHES_URL = import.meta.env.VITE_SERVER_URL

const createCardAction = async(_prevState, formData) => {

  const dateFormat = (date) => {
    return Intl.DateTimeFormat("ru-Ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    }).format(date)
  }
  
  try {
    await new Promise((res) => setTimeout(res, 2000))

    const newWishCard = Object.fromEntries(formData)
    const isClearForm = newWishCard.clearForm

    const response = await fetch(`${WISHES_URL}/wishes`, {
      method: "POST",
      body: JSON.stringify({
        wish: newWishCard.wish,
        description: newWishCard.description,
        img: newWishCard.img,
        completed: false,
        editDate: dateFormat(new Date()),
      })
    })

    if(!response.ok) {
      throw Error(response.statusText); 
    } 

    const newWish = await response.json()

    return isClearForm ? { success: true } : { ...newWish, success: true }
    
  } catch (error) {
      console.log(error);
      return {}
  }
}

export const AddWishpage = () => {
const [formState, formAction, isPending] = useActionState(createCardAction, {clearForm: true})

  return (
    <> 
      {isPending && <Loader />}

      <h2 className={cls.formTitle}>Добавить желание</h2>

      <WishForm formAction={formAction} isPending={isPending} formState={formState} submitBtnText="Добавить желание"/>

      {formState.success && !isPending && (
              <p className={cls.formMessage}>Желание успешно добавлено!</p>
            )}

      {formState.error && !isPending && (
        <p className={cls.formMessage}>Ошибка: {formState.error}</p>
      )}

    </>
  );
};
