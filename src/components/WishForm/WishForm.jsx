import { Button } from "../Button";
import cls from "./WishForm.module.css";

export const WishForm = ({ formAction, isPending, submitBtnText}) => {
  
  return (
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
          <textarea name="img" id="img" cols="30" rows="2" ></textarea>
        </div> 

        <Button isDisabled={isPending}>{submitBtnText}</Button>

      </form>
  );
};
