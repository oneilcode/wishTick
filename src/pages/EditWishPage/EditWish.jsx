import { useActionState } from "react";
import cls from "./EditWishPage.module.css";
import { Loader } from "../../components/Loader";
import { WishForm } from "../../components/WishForm";

const WISHES_URL = "http://localhost:8801"

const editCardAction = async (_prevState, formData) => {
  
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
    const wishId = newWishCard.wishId;
    
    const isClearForm = newWishCard.clearForm

    const response = await fetch(`${WISHES_URL}/wishes/${wishId}`, {
      method: "PATCH",
      body: JSON.stringify({
        wish: newWishCard.wish,
        description: newWishCard.description,
        img: newWishCard.img,
        completed: false,
        editDate: dateFormat(new Date()),
      })
    })

    if(!response.ok) {
      throw new Error(response.statusText); 
    }
    const newWish = await response.json()

    return isClearForm ? {} : newWish
    
  } catch (error) {
      console.log(error);
      return {}
  }
}

export const EditWish = ({ initialState = {} }) => {
  const [formState, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearForm: true})
  console.log("initialState:", initialState);
  return (
    <> 
      {isPending && <Loader />}

      <h2 className={cls.formTitle}>Редактировать желание</h2>

      <WishForm formAction={formAction} isPending={isPending} formState={formState} submitBtnText="Редактировать желание"/>
    </>
  );
};