import type { WishFormState } from "@/types/wish";
import { Button } from "../Button";
import cls from "./WishForm.module.css";

interface WishFormProps {
  formAction: (formData: FormData) => void;
  formState: WishFormState;
  isPending: boolean;
  submitBtnText: string;
}

export const WishForm = ({ formAction, formState, isPending, submitBtnText }: WishFormProps) => {
  return (
    <form className={cls.formContainer} action={formAction}>
      <input type="text" name="wishId" defaultValue={formState.id} hidden />

      <div className={cls.formControl}>
        <label htmlFor="wishField">Ваше желание*</label>
        <textarea
          defaultValue={formState.wish}
          name="wish"
          id="wishField"
          cols={30}
          rows={2}
          required
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="descField">Добавьте подробное описание</label>
        <textarea
          defaultValue={formState.description}
          name="description"
          id="descField"
          cols={30}
          rows={10}
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="img">Добавьте ссылку на картинку в формате https://...</label>
        <textarea defaultValue={formState.img} name="img" id="img" cols={30} rows={2}></textarea>
      </div>

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
