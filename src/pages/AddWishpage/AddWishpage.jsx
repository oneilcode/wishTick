import cls from './AddWishpage.module.css';
import { Button } from '../../components/Button';
import { useActionState } from 'react';

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

    const newWish = response.json()

    return {}
  } catch (error) {
   console.log(error);
   
  }
}

export const AddWishpage = () => {
const [formState, formAction, ispending] = useActionState(createCardAction, {clearForm: false})

  return (
    <> 
      <h2 className={cls.formTitle}>Добавить желание</h2>

      <form className={cls.formContainer} action={formAction}>
        <div className={cls.formControl}>
          <label htmlFor="wishField">Ваше желание</label>
          <textarea name="wish" id="wishField" cols="30" rows="2"  required></textarea>
        </div>   

        <div className={cls.formControl}>
          <label htmlFor="descField">Добавьте подробное описание</label>
          <textarea name="description" id="descField" cols="30" rows="10"></textarea>
        </div> 

        <div className={cls.formControl}>
          <label htmlFor="img">Добавьте ссылку на картинку в формате https://...</label>
          <textarea name="img" id="img" cols="30" rows="2"></textarea>
        </div> 

        <Button>Добавить желание</Button>

      </form>
    </>
  );
};
