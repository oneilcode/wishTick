import { Button } from "../Button";
import cls from "./WishForm.module.css";

export const WishForm = ({ formAction, formState, isPending, submitBtnText}) => {
  
  return (
      <form className={cls.formContainer} action={formAction}>
        <div className={cls.formControl}>
          <label htmlFor="wishField">Ваше желание</label>
          <textarea defaultValue={formState.wish} name="wish" id="wishField" cols="30" rows="2"  required></textarea>
        </div>   

        <div className={cls.formControl}>
          <label htmlFor="descField">Добавьте подробное описание</label>
          <textarea defaultValue={formState.description}  name="description" id="descField" cols="30" rows="10"></textarea>
        </div> 

        <div className={cls.formControl}>
          <label htmlFor="img">Добавьте ссылку на картинку в формате https://...</label>
          <textarea defaultValue={formState.img}  name="img" id="img" cols="30" rows="2" ></textarea>
        </div> 

        <label htmlFor="clearFormField" className={cls.clearFormControl}>
         <input id="clearFormField" type="checkbox" className={cls.clearCheckbox} name="clearForm" defaultChecked={formState.clearForm}/>
         <span>Очистить форму после добавления вопроса</span>
        </label> 

        <Button isDisabled={isPending}>{submitBtnText}</Button>

      </form>
  );
};
